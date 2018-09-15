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
  constructor(private authService:AuthService) { }

  ngOnInit() {

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

}
