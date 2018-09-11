import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShortTermComponent implements OnInit {
  accept =false
  constructor() { }

  ngOnInit() {
  }
  handleChange(evt) {
    this.accept=true
  }

}
