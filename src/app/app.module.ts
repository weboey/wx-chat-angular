import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './pages/message/message.component';
import { ChatSingleComponent } from './pages/chat-single/chat-single.component';
import { ChatGroupComponent } from './pages/chat-group/chat-group.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatSingleComponent,
    ChatGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
