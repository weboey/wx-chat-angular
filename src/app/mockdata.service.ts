import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  lastUuid = 0;
  setInterval = null;
  dataCache = [];
  getMessage = new Subject();
  constructor() {
    this.startMock();
  }
  startMock() {
    this.setInterval = setInterval(() => {
      for (let i = 0 ; i < 50000; i++) {
        const obj = {
          from_user: 'test',
          groupId: Math.ceil(Math.random() * 6),
          id: (new Date()).getTime() * 100 + (this.lastUuid++)  % 100,
          message: this.generateRandomString(12),
          time: '2019-09-02',
          type: 'group',
          isEnterChat: true
        };
        this.dataCache.push(obj);
        this.getMessage.next(obj);
      }
    }, 0);
  }
  startMock2() {
    this.setInterval = setTimeout(() => {
      for (let i = 0 ; i < 50; i++) {
        this.getMessage.next({
          from_user: 'test',
          groupId: Math.ceil(Math.random() * 6),
          id: (new Date()).getTime() * 100 + (this.lastUuid++)  % 100,
          message: this.generateRandomString(12),
          time: '2019-09-02',
          type: 'group',
          isEnterChat: true
        });
      }
    }, 100);
    setTimeout(() => {
      for (let i = 0 ; i < 50; i++) {
        this.getMessage.next({
          from_user: 'test',
          groupId: Math.ceil(Math.random() * 6),
          id: (new Date()).getTime() * 100 + (this.lastUuid++)  % 100,
          message: this.generateRandomString(12),
          time: '2019-09-02',
          type: 'group',
          isEnterChat: true
        });
      }
    }, 200);
  }
  stopMock() {
    clearInterval(this.setInterval);
    console.log(this.dataCache.length);
  }
  generateRandomString(count) {
    let d = new Date().getTime();
    const str = "x".repeat(count || 16);
    return str.replace(/[xy]/g,function(c){
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c==="x" ? r : (r&0x7|0x8)).toString(16);
    });
  }
}
