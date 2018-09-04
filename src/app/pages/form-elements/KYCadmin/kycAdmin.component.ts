import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,AbstractControl} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

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
    public AdminKyc:FormGroup;
    constructor(private formBuilder: FormBuilder) { 

      
    }
    //https://stackoverflow.com/questions/47827634/how-to-read-form-values-in-controller
    public onSubmit(value) {
        console.log(value);
        
    }
 

}
