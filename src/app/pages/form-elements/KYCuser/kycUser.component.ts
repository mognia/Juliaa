import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from "../../../services/auth-service.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'app-kycUser',
    templateUrl: './kycUser.component.html',
    styleUrls: ['./kycUser.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class KycUserComponent {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    public steps: any[];
    public accountForm: FormGroup;
    public personalForm: FormGroup;
    public AddressForm: FormGroup;
    public details: any = {};
    public showConfirm: boolean;
    public confirmed: boolean;
    public photo: any;
    public router: Router;
    haveImg:boolean=false;
    photoName: any;
    photoContent: any;
    fileExtension: any;
     fileExtensionError: boolean ;
     validAddress:boolean =true;
    fileExtensionMessage: any;
    dateFormControl = new FormControl('', [
        Validators.required,
    ]);
    image(event) {
        let fileType = event.target.files[0].type;
        let fileSize = event.target.files[0].size;

            console.log(fileType);
            if (fileType == 'application/x-msdownload') {
                this.fileExtensionError = true;
                this.fileExtensionMessage='';
                this.fileExtensionMessage='This is Not an Valid image please select .png or .jpg file';
                
            }

        if (fileType !='image/png') {
            if (fileType !='image/jpg') {
                if (fileType != 'image/jpeg') {
                    // document.getElementById('secondForm').reset();
                    // document.getElementById('imginput').value =''
                    this.fileExtensionError = true;
                    this.fileExtensionMessage='';
                    this.fileExtensionMessage='This is Not an Valid image please select .png or .jpg file';
                    console.log(event.target.files[0]);
                }


            }

        }if(fileSize > 1000000){
            // document.getElementById('secondForm').reset();
            // event.target.files[0]='';

            this.fileExtensionError = true;
            this.fileExtensionMessage='';
            this.fileExtensionMessage='Maximum image size is : 1MB';
        }
        else{
            console.log(event.target.files[0]);
            this.fileExtensionError = false;
            this.fileExtensionMessage='';
            this.haveImg=true;
            const reader = new FileReader();
            const file = event.target.files[0];
            reader.onload = () => {
                this.photo = reader.result;
            }
            reader.readAsDataURL(file);  

        }
        

    }

    constructor( public dialog: MatDialog,router: Router, private authService: AuthService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) {
        this.router = router;
        this.steps = [
            //   {name: 'Account Information', icon: 'fa-lock', active: true, valid: false, hasError:false },
            { name: 'Personal Information', icon: 'fa-user', active: true, valid: false, hasError: false },
            { name: 'Address Information', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
            { name: 'Confirm Your Details', icon: 'fa-check-square-o', active: false, valid: false, hasError: false }
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
            'wallet': ['',Validators.required],

        });

        this.AddressForm = this.formBuilder.group({
            'address': ['', Validators.required],
            'image': ['']
        });
    }
    public next() {
        this.haveImg=false;
        let accountForm = this.accountForm;
        let personalForm = this.personalForm;
        let AddressForm = this.AddressForm;
      
        if (this.steps[this.steps.length - 1].active)
            return false;

        this.steps.some(function (step, index, steps) {
            if (index < steps.length - 1) {
                if (step.active) {
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
                    if (step.name == 'Personal Information') {
                        if (personalForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index + 1].active = true;
                            return true;
                        }
                        else {
                            step.hasError = true;
                        }
                    }
                    if (step.name == 'Address Information') {

                                if (AddressForm.valid) {
                                    step.active = false;
                                    step.valid = true;
                                    steps[index + 1].active = true;
                                    return true;
                                }
                                
                            

                            


                        else {
                            step.hasError = true;
                        }
                    }
                }
            }
        });


        this.details.firstname = this.personalForm.value.firstname;
        this.details.lastname = this.personalForm.value.lastname;
        this.details.birth = this.personalForm.value.birth;
        this.details.email = this.personalForm.value.email;
        this.details.phone = this.personalForm.value.phone;
        this.details.wallet = this.personalForm.value.wallet;
        this.details.address = this.AddressForm.value.address;
        // this.details.image = this.AddressForm.value.image;

    }

    public prev() {
        if (this.steps[0].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if (index != 0) {
                if (step.active) {
                    step.active = false;
                    steps[index - 1].active = true;
                    return true;
                }
            }
        });
    }

    public confirm() {
        this.steps.forEach(step => step.valid = true);
        this.confirmed = true;
        console.log(this.details);

        this.authService.updatekyc(this.details).subscribe(data => {
            if (data.success) {
                this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
                //   this.router.navigate(['/login']);
            } else {
                this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
                //   this.router.navigate(['/register']);
            }
        });

    }
    public home(){
          this.router.navigate(['pages/dashboard']);
    }

    public isAddress(event){

        if (!/^(0x)?[0-9a-f]{40}$/i.test(event)) {
            document.getElementById('walletDiv').classList.add("has-danger");
            document.getElementById('walletDiv').classList.remove("has-success");
            // check if it has the basic requirements of an address
            console.log('not Address');
            this.haveImg=false;
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(event) || /^(0x)?[0-9A-F]{40}$/.test(event)) {
            document.getElementById('walletDiv').classList.remove("has-danger");
            document.getElementById('walletDiv').classList.add("has-success");
            // If it's all small caps or all all caps, return true
            console.log('address');
            this.haveImg=true;
            return true;
        } 
        console.log(event);
        
    }


}
