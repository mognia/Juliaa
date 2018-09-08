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
    public paymentForm: FormGroup;
    public details: any = {};
    public showConfirm: boolean;
    public confirmed: boolean;
    public photo: any;
    public router: Router;
    photoName: any;
    photoContent: any;
    fileExtension: any;
    fileExtensionError: boolean = false;
    fileExtensionMessage: any;
    dateFormControl = new FormControl('', [
        Validators.required,
    ]);
    image(event) {

        var file = event.target.files[0];
        this.photoName = file.name;
        console.log(file.size);
        
        var allowedExtensions =
            ["jpg"];
        this.fileExtension = this.photoName.split('.').pop();

        if (this.isInArray(allowedExtensions, this.fileExtension)) {
            this.fileExtensionError = false;
            this.fileExtensionMessage = ""
        } else if(file.size>1000000){
            this.fileExtensionMessage = "Only Less than 1MB photos Allowed"
            this.fileExtensionError = true;
        }
        else {
      
            this.fileExtensionMessage = "Only .jpg photos allowed!!"
            this.fileExtensionError = true;
        }

        if (file) {
            var reader = new FileReader();
            reader.onload = () => {
                this.photo = reader.result;
            }
            reader.readAsDataURL(file);
        } else {
            alert("Failed to load file");
        }



    }
    isInArray(array, word) {
        return array.indexOf(word.toLowerCase()) > -1;
    }
    constructor(public dialog: MatDialog,router: Router, private authService: AuthService, private formBuilder: FormBuilder, private flashMessage: FlashMessagesService) {
        this.router = router;
        this.steps = [
            //   {name: 'Account Information', icon: 'fa-lock', active: true, valid: false, hasError:false },
            { name: 'Personal Information', icon: 'fa-user', active: true, valid: false, hasError: false },
            { name: 'Payment Information', icon: 'fa-credit-card', active: false, valid: false, hasError: false },
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
            'wallet': ['', Validators.required],

        });

        this.paymentForm = this.formBuilder.group({
            'address': ['', Validators.required],
            'image': ['']
        });
    }

    public next() {
        let accountForm = this.accountForm;
        let personalForm = this.personalForm;
        let paymentForm = this.paymentForm;

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
                    if (step.name == 'Payment Information') {
                        if (paymentForm.valid) {
                            console.log(paymentForm.value.image);

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
        this.details.address = this.paymentForm.value.address;
        // this.details.image = this.paymentForm.value.image;

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

}
