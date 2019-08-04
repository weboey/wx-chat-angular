import { Injectable } from '@angular/core';
import {MockDataService} from '../../mockdata.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  dataList = [];
  setInterval = null;
  broadcastMessageList = new Subject();
  constructor(private mockDataService: MockDataService) {
    this.mockDataService.getMessage.subscribe(res => {
      this.dataList.push(res);
    });
    this.start();
  }
  start() {
    this.setInterval = setInterval(() => {
      if (!!this.dataList.length) {
        this.broadcastMessageList.next(this.dataList);
        this.dataList = [];
      } else {
        this.stop();
      }
    }, 1000);
  }
  stop() {
    clearInterval(this.setInterval);
  }
  getMessageList() {
    return this.broadcastMessageList.asObservable();
  }
}
