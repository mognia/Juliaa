import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public router: Router;
  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;

  constructor(router:Router, 
              fb:FormBuilder,
              private authService:AuthService,
              private flashMessage: FlashMessagesService) {
      this.router = router;
      this.form = fb.group({
          'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
          'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.email = this.form.controls['email'];
      this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
      if (this.form.valid) {
        this.authService.authenticateUser(values).subscribe(data => {
          console.log(data);
          
            if(data.success) {
              this.authService.storeUserData(data.token, data.user);
              this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
              this.router.navigate(['pages/dashboard']);
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
              this.router.navigate(['login']);
            }
        });
          this.router.navigate(['pages/dashboard']);
      }
  }

  ngAfterViewInit(){
      document.getElementById('preloader').classList.add('hide');                 
  }

}
