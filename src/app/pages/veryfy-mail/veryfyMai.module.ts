import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VeryfyMailComponent } from "./veryfy-mail.component";
import { FlashMessagesModule } from 'angular2-flash-messages';
export const routes = [
  { path: '', component: VeryfyMailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FlashMessagesModule.forRoot(),
  ],
  declarations: [
    VeryfyMailComponent
  ]
})
export class VeryfyMailModule { }
