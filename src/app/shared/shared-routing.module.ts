import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListTaskComponent } from './components/list-task/list-task.component'


const sharedRoutes: Routes = [
/*  {path: 'list', component: ListTaskComponent },
  {path: 'account', loadChildren: accountModule }
*/];

@NgModule({
  imports: [
    RouterModule.forChild(sharedRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SharedRoutingModule { }
