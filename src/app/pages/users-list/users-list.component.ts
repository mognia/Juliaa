import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth-service.service";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  public users=[];
  temp = [];
  selectedEmail;
  address;
  email;
  firstName;
  lastname;
  passImg;
  telephone;
  walletAddress;
  birthDate;
  KYCUpdated;
  KYCVerified;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getUserList()
    this.authService.getUserList().subscribe(data => {
      let users = data['users'];

      users.forEach(user => {
        this.users.push(user.email);
        this.temp.push(user.email)
      });
      console.log(this.users);
      
    });
  }
  onSearchChange(searchValue : string){
    let val = searchValue.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.users = temp;
    console.log(temp);
    
  }

  getKyc(email){
    console.log(email);
    this.selectedEmail = email;
    this.authService.getKyc({'email':email}).subscribe(data=>{
    let user= data["user"];
    this.KYCUpdated = user.KYCUpdated;
    this.KYCVerified = user.KYCVerified;
    this.address = user.address;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastname = user.lastName;
    this.passImg = user.passportImageAddress;
    this.telephone = user.telephone;
    this.walletAddress = user.walletAddress;
    this.birthDate = user.birthDate;
      // console.log(user.email);
      
    });
    
  }

}
