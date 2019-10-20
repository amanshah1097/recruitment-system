import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './comment.component/comment.component';

const routes: Routes = [
  {
    path: '',
    component: CommentComponent,
    data: {
      title: 'Comment'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class CommentRoutingModule { }
