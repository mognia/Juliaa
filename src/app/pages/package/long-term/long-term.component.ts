import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-long-term',
  templateUrl: './long-term.component.html',
  styleUrls: ['./long-term.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LongTermComponent implements OnInit {
  accept =false;
  KYCVerified:boolean=false;
  public router: Router;
  constructor(router: Router,) {
    this.router = router;
   }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')) ;
    if (user.KYCVerified) {
      this.KYCVerified = true;
    }
    
  }
  handleChange(evt) {
    this.accept=true
  }
  gotoKyc(){
    this.router.navigate(['pages/form-elements/UserKYC']);
    location.reload()
  }
}
