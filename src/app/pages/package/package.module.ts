import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LongTermComponent  } from "./long-term/long-term.component";
import { ShortTermComponent } from "./short-term/short-term.component";

export const routes = [
    { path:'', redirectTo:'LongTerm', pathMatch:'full' },
  { path: 'LongTerm', component: LongTermComponent, pathMatch: 'full' },
  { path: 'ShortTerm', component: ShortTermComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LongTermComponent,
    ShortTermComponent
  ]
})
export class PackageModule { }
