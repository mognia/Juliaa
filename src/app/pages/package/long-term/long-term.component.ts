import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-long-term',
  templateUrl: './long-term.component.html',
  styleUrls: ['./long-term.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LongTermComponent implements OnInit {
  accept =false
  constructor() { }

  ngOnInit() {
    console.log(this.accept);
    
  }
  handleChange(evt) {
    this.accept=true
  }
}
