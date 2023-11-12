import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { GenericPrimeDatatableComponent } from './generic-prime-datatable/generic-prime-datatable.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { GenericInputComponent } from './generic-input/generic-input.component';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GenericButtonComponent,
    GenericPrimeDatatableComponent,
    GenericInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ToastModule,
    InputTextModule,
    PaginatorModule,
    ButtonModule,
    MenubarModule,
    AutoCompleteModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GenericButtonComponent,
    GenericPrimeDatatableComponent,
    GenericInputComponent
  ]
})
export class SharedModule { }
