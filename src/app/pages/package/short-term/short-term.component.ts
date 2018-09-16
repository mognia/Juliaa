import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-short-term',
  templateUrl: './short-term.component.html',
  styleUrls: ['./short-term.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShortTermComponent implements OnInit {
  accept =false;
  public router: Router;
  KYCVerified:boolean=false;
  constructor(router: Router) { 
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
