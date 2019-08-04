import { Component, OnInit } from '@angular/core';
import {MockDataService} from '../../mockdata.service';
import {MessageService} from '../service/message.service';
import {TaskManageService} from '../service/task-manage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  lastUuid = 0;
  totalUnRead = 0;
  constructor(private mockDataService: MockDataService,
              private messageService: MessageService,
              private router: Router,
              private taskManageService: TaskManageService) { }
  dataList = [];

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      this.dataList.push({
        from_user: '小美',
        time: '2019-07-08',
        message: '约不约',
        id: i + 1,
        type: 'group',
        unread: 0,
        isEnterChat: false
      });
    }
    console.log(this.dataList);
    this.getTotalUnRead();
    // this.updateBySocketMock();
    this.messageService.getMessageList().subscribe(listMsg => {
      console.log(listMsg);
      this.taskManageService.timeChunk(listMsg, this.updateBySocket.bind(this), 1000, this.getTotalUnRead.bind(this))();
    });
  }
  getTotalUnRead() {
    this.totalUnRead = this.dataList.reduce((pre, item, index) => {
      return  pre + item.unread;
    }, 0);
  }
  goChat(type, id) {
    this.router.navigate(['/chatSingle']);
  }
  updateBySocketMock() {
    this.mockDataService.getMessage.subscribe(res => {
      const index = this.dataList.findIndex((item) => {
        return item.type === res.type && item.id === res.groupId;
      });
      if (index !== -1) {
        this.dataList[index].unread ++;
        this.dataList[index].message = res.message;
      }
      this.getTotalUnRead();
    });
  }
  updateBySocket(res) {
    const index = this.dataList.findIndex((item) => {
      return item.type === res.type && item.id === res.groupId;
    });
    if (index !== -1) {
      this.dataList[index].unread ++;
      this.dataList[index].message = res.message;
    }
  }
  stop() {
    this.mockDataService.stopMock();
  }
  start() {
    this.mockDataService.startMock();
  }
}
