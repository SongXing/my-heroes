import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr.A' },
      { id: 12, name: 'Mr.B' }, 
      { id: 13, name: 'Mr.C' },
      { id: 14, name: 'Mr.D' },
      { id: 15, name: 'Mr.E' },
      { id: 16, name: 'Mr.F' },
      { id: 17, name: 'Mr.G' },
      { id: 18, name: 'Mr.H' },
      { id: 19, name: 'Mr.I' },
      { id: 20, name: 'Mr.J' }
    ];
    return {heroes}; // 此处返回的需要是 json 数据，使用 {} ，如果使用（）则报404错误，数据不对
  }
}

