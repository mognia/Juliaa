import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-referal',
  templateUrl: './referal.component.html',
  styleUrls: ['./referal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReferalComponent implements OnInit {
  public router: Router;
  UerId;
  UserLink;
  hasReferal:boolean;
  arr=[];
  temp = [];
  constructor(router:Router,private authService:AuthService, private flashMessage: FlashMessagesService) {

 
    this.authService.getReferal().subscribe(data => {
      console.log(data.referals);
      
      if(data.referals.length){
        this.hasReferal =true;
      }else{
        this.hasReferal=false;
      }
      console.log(data.referals);

      data.referals.forEach(user => {
        this.arr.push(user.email);
        this.temp.push(user.email)
        console.log(this.arr);
        
      });
      
    });
  }

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.UerId =JSON.parse(user).id;
    this.UserLink ="http://localhost:4200/#/register?referalCode="+ this.UerId;
  }

  onSearchChange(searchValue : string){
    let val = searchValue.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.arr = temp;
    console.log(temp);
    
  }

}
