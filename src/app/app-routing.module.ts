import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MessageComponent} from './pages/message/message.component';
import {ChatSingleComponent} from './pages/chat-single/chat-single.component';
import {ChatGroupComponent} from './pages/chat-group/chat-group.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MessageComponent },
  { path: 'chatSingle', component: ChatSingleComponent },
  { path: 'chatGroup', component: ChatGroupComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
