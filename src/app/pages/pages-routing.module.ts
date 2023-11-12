import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';

const routes:Routes = [
  {path:'dashboard', component:PagesComponent,
  children: [
    {path:'', component:DashboardComponent, data:{titulo:'Dashboard'}}
  ]
}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class PagesRoutingModule { }
