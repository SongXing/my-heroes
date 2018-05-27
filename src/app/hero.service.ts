import { Injectable } from '@angular/core';
import { Hero } from "./hero";
// import { HEROES } from "./mock-heroes";// 使用了 http 方法获取远端服务器数据后，就不再需要本地模拟数据了
/* 使用 RxJS 的 of() 函数来模拟从服务器返回数据 */
import { Observable, of } from "rxjs";
/* 注入 message 服务 */
import { MessageService } from "./message.service";
/* 导入一些所需的 HTTP 符号 */
import { HttpClient, HttpHeaders } from "@angular/common/http";
/* 错误处理 */
import { catchError, map, tap } from "rxjs/operators";


/* 定义 httpOperations 常量 */
const httpOperations = {
  headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  // 修改构造函数 (经典的服务中的服务场景)
  constructor(
    private http: HttpClient, // 注入 HttpClient 属性
    private messageService: MessageService
  ) {}

  
  /* 改用注册服务获取数据 */
  getHeroes(): Observable<Hero[]> {    
    // 使用 message service
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    // 转成使用 http 方法获取数据 HEROES
    return this.http.get<Hero[]>(this.heroesUrl)
               .pipe (
                  tap(heroes => this.log(`fetched heroes`)),
                  catchError(this.handleError('getHeroes',[]))
    );
  }

  getHero(id: number): Observable<Hero> {
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    // 转成 http 方法获取
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOperations).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    )
  }

  /* 添加新英雄 */
  addHero(hero: Hero): Observable<Hero> {
    // 此处使用的是 post() 方法,而不是 put()，有区别
    // 这样写期待服务器为这个新的英雄生成一个 id，然后把他通过 Observable<Hero> 返回给调用者
    return this.http.post<Hero>(this.heroesUrl, hero, httpOperations)
    .pipe(
      tap((hero: Hero) => this.log(`add hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    )
  }

  /* 删除英雄 */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOperations)
    .pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    )
  }

  /* 搜索 */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`,[]))
    );
  }
  /**
   * 处理 http 失败的操作
   * 同时使应用能够继续进行
   */
  private handleError<T> ( operation = 'operation', result?: T ) {
    return (error: any): Observable<T> => {
      // send the error to remote logging infrastructure
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  /**
   * 
   * @param message 打印
   */
  private log(message: string) {
    this.messageService.add('HeroService: '+ message);
  } 
}
