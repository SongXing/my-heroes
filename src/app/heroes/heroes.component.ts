import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
/* 使用注册服务来提供数据 */
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  // selectedHero: Hero; // 使用dashboard组件后不要该代码

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  // 使用dashboard组件后不要该代码
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  getHeroes(): void {
    /* 使用注册服务后，使用异步方式 */
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();//去掉空格
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter( h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
