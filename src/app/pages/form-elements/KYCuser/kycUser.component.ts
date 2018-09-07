import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kycUser',
  templateUrl: './kycUser.component.html',
  styleUrls: ['./kycUser.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KycUserComponent {
    public steps:any[];
    public accountForm:FormGroup;
    public personalForm:FormGroup;
    public paymentForm:FormGroup;
    public details:any = {};
    public showConfirm:boolean;
    public confirmed:boolean;
    public photo:any;
    public router: Router;

    image(event){
        const file = event.target.files[0]
        console.log(file);
        if (file.type = 'image/png') {
            console.log('pngggg');
            
            this.details.image = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.photo = reader.result;
            }
            reader.readAsDataURL(file);
        }
        else{
            this.image = '';
        }
  
    }
    constructor(router:Router,private authService:AuthService,private formBuilder: FormBuilder,private flashMessage: FlashMessagesService) { 


        this.steps = [
        //   {name: 'Account Information', icon: 'fa-lock', active: true, valid: false, hasError:false },
          {name: 'Personal Information', icon: 'fa-user', active: true, valid: false, hasError:false },
          {name: 'Payment Information', icon: 'fa-credit-card', active: false, valid: false, hasError:false },
          {name: 'Confirm Your Details', icon: 'fa-check-square-o', active: false, valid: false, hasError:false }
        ]

        // this.accountForm = this.formBuilder.group({
        //     'username': ['', Validators.required],
        //     'password': password,
        //     'confirmPassword': confirmPassword,
        //     'email': ['', Validators.compose([Validators.required, CustomValidators.email])]            
        // });

        this.personalForm = this.formBuilder.group({

            'firstname': ['', Validators.required],
            'lastname': ['', Validators.required],
            'birth': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'phone': ['', Validators.required],
            'wallet': ['', Validators.required],

        });

        this.paymentForm = this.formBuilder.group({
            'address': ['', Validators.required],
            'image': ['']
        });        
    }

    public next(){
        let accountForm = this.accountForm;
        let personalForm = this.personalForm;
        let paymentForm = this.paymentForm;

        if(this.steps[this.steps.length-1].active)
            return false;
            
        this.steps.some(function (step, index, steps) {
            if(index < steps.length-1){
                if(step.active){
                    // if(step.name=='Account Information'){
                    //     if (accountForm.valid) {
                    //         step.active = false;
                    //         step.valid = true;
                    //         steps[index+1].active=true;
                    //         return true;
                    //     }
                    //     else{
                    //         step.hasError = true;
                    //     }                      
                    // }
                    if(step.name=='Personal Information'){
                        if (personalForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Payment Information'){
                        if (paymentForm.valid) {
                            console.log(paymentForm.value.image);
                            
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                }
            }   
        });


        this.details.firstname = this.personalForm.value.firstname ;
        this.details.lastname = this.personalForm.value.lastname;
        this.details.birth = this.personalForm.value.birth;
        this.details.email = this.personalForm.value.email;
        this.details.phone = this.personalForm.value.phone;
        this.details.wallet = this.personalForm.value.wallet;
        this.details.address = this.paymentForm.value.address;
        // this.details.image = this.paymentForm.value.image;

    }

    public prev(){
        if(this.steps[0].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if(index != 0){
                if(step.active){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                }
            }             
        });
    }

    public confirm(){
        this.steps.forEach( step => step.valid = true );
        this.confirmed = true;
        this.authService.updatekyc(this.details).subscribe(data => {
            if(data.success) {
              this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
            //   this.router.navigate(['/login']);
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
            //   this.router.navigate(['/register']);
            }
          });

    }

    // var isAddress = function (address) {
    //     if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    //         // check if it has the basic requirements of an address
    //         return false;
    //     } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    //         // If it's all small caps or all all caps, return true
    //         return true;
    //     } else {
    //         // Otherwise check each case
    //         return isChecksumAddress(address);
    //     }
    // };
    var isChecksumAddress = function (address) {
        // Check each case
        address = address.replace('0x','');
        var addressHash = sha3(address.toLowerCase());
        for (var i = 0; i < 40; i++ ) {
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    };

    function isAddress(control: AbstractControl): { [key: string]: boolean } | null {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return isChecksumAddress(address);
        }
    }

}
