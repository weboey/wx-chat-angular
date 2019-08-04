import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskManageService {

  constructor() { }

  timeChunk(arr, fn, count, completeFn?: any) {
    let obj;
    let t;
    const start = () => {
      for (let i = 0; i < Math.min(count || 1, arr.length); i++) {
        obj = arr.shift();
        fn(obj);
      }
    };
    return () => {
      t = setInterval(() => {
        if (arr.length === 0) {
          completeFn(arr.length);
          return clearInterval(t);
        }
        start();
      }, 10);
    };
  }
}
