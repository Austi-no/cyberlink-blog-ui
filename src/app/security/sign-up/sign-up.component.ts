import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from "../custom-validators";
import { SecurityService } from '../security.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  // registrationSuccess: boolean;
  // registrationFailure: boolean;
  constructor(private router: Router, private fb: FormBuilder, private validatorService: CustomValidationService, private toastr: ToastrService, private service: SecurityService) { }

  ngOnInit() {

    this.reactiveForm();
  }


  reactiveForm() {
    sessionStorage.clear();
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      surname: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required], [Validators.email]],
      password: ['', [Validators.required], [this.validatorService.patternValidator()]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.validatorService.MatchPassword('password', 'confirmPassword'),

      })
  }



  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalids
    if (this.signupForm.invalid) {

      const invalid = [];
      const controls = this.signupForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      this.submitted = true;
      this.toastr.error('The Following fields are Invalid: ' + invalid, 'Invalid Fields');
      return;

    }



    this.service.saveUser(this.signupForm.value).subscribe(res => {
      if (res.response == 'Success') {
        this.submitted = false;
        // this.registrationSuccess = true;
        // this.registrationFailure = false;
        this.signupForm.reset();
        this.toastr.success('User Signup was Successful', res.success);
        this.gotologin();

      }
      else {
        // this.registrationSuccess = false;
        // this.registrationFailure = true;
      }

    },
      error => {
        this.submitted = false;
        this.toastr.error('User Signup Failed', 'Failure');

      }
    )
  }


  gotologin() {
    this.router.navigate(["login"]);

  }
}
