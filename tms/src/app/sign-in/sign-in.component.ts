import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Trainee } from 'src/app/shared/models/trainee.model';
import { TraineeService } from 'src/app/shared/services/trainee.service';
import { Select } from 'src/app/commons/select.model';
import { Mentor } from 'src/app/shared/models/mentor.model';
import { MentorService } from 'src/app/shared/services/mentor.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  trainee: Trainee;
  mentor: Mentor;
  ismentor = false;
  SignInForm: FormGroup;
  checked: boolean = false;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.SignInForm = this.formbuilder.group({
      email: [null, [Validators.required]],
      password: [null, null],
      role: ['Trainee', null],
      checked: [false, null]
    });
    this.checkLogin();
  }
  onFormSubmit(form: NgForm) {
    if (this.SignInForm.controls.role.value === 'Trainee') {
      this.authService.loginTrainee(this.SignInForm.controls.email.value, this.SignInForm.controls.password.value)
        .subscribe((data: any) => {
          this.router.navigate(['/home']);
          this.toastr.success('Login Successful');
          if (this.SignInForm.controls.checked.value === true) {
            localStorage.setItem('email', JSON.stringify(this.SignInForm.controls.email.value));
            localStorage.setItem('password', JSON.stringify(this.SignInForm.controls.password.value));
          }
        }, (err) => {
          console.log(err);
          this.toastr.error('Login Failed');
        });
    } else {
      this.authService.loginMentor(this.SignInForm.controls.email.value, this.SignInForm.controls.password.value)
        .subscribe((data: any) => {
          this.router.navigate(['/home']);
          this.toastr.success('Login Successful');
          if (this.SignInForm.controls.checked.value === true) {
            localStorage.setItem('email', JSON.stringify(this.SignInForm.controls.email.value));
            localStorage.setItem('password', JSON.stringify(this.SignInForm.controls.password.value));
            localStorage.setItem('role', JSON.stringify(this.SignInForm.controls.role.value));
            // alert(this.cookie.set(''+data.email,form.value));
            // console.log(document.cookie)
          }

        }, (err) => {
          console.log(err);
          this.toastr.error('Login Failed');
        });
    }
  }
  checkLogin() {
    if (localStorage.getItem('email') != null && localStorage.getItem('password') != null) {
      this.router.navigate(['/home']);
    }
  }
}
