import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wizard',
  templateUrl: './kycAdmin.component.html',
  styleUrls: ['./kycAdmin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KycAdminComponent {
    public verifyFirstName:AbstractControl;
    public NotVerifyFirstName:AbstractControl;
    public verifyLastName:AbstractControl;
    public NotVerifyLastName:AbstractControl;
    public email:AbstractControl;
    public form:FormGroup;
    public router: Router;
    users=[];
    userEmail;
    selected = [];
    rows:any = [];
    constructor(router:Router,private authService:AuthService, private flashMessage: FlashMessagesService,private fb: FormBuilder) { 
        this.form = fb.group({
            verifyFirstName: [false],
            verifyLastName: [false],
            email:['']
        });
        this.email = this.form.controls['email'];
        this.verifyFirstName = this.form.controls['verifyFirstName'];
        this.authService.getUserListKyc().subscribe(data => {
            console.log(data);
            
            
            data.users.forEach(user => {
     
                    if (!user.KYCVerified) {
                        this.users.push(user)
                        
                    }
     

                
              });
              console.log(this.users);
              
          });
      
    }
    //https://stackoverflow.com/questions/47827634/how-to-read-form-values-in-controller
    public onSubmit(value) {
        
        // for (const i in this.users) {
        //     this.users.forEach(user=>{
        //         // console.log(user.email);
        //                 value['email'] = user.email
        //     })
        // }
        value['email'] = this.userEmail


        console.log(value);
        


        
    }


    getmail(email){
        this.userEmail=email;
        
    }

}
