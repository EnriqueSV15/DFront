import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ConfirmationService, MessageService} from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
 ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    AccordionModule,
    TabViewModule,
    AvatarModule,
    FieldsetModule,
    ImageModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class PagesModule { }
