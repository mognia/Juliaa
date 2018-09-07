import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart  } from "chart.js";
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserDashboardComponent implements OnInit {
  chart=[];
  constructor() { }

  ngOnInit() {

  }

}
