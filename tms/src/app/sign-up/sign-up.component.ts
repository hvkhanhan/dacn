import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Mentor } from '../shared/models/mentor.model';
import { MentorService } from '../shared/services/mentor.service';
import { TraineeService } from '../shared/services/trainee.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  SignUpForm: FormGroup;
  ismentor = false;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    protected mentorService: MentorService,
    protected traineeService: TraineeService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.SignUpForm = this.formbuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      idskill: [1, null],
      password: [null, null],
      isActive: [0, null],
      confirmpassword: [null, null]
    });
    this.mentorService.getMentorSkill();
  }
  change(is: boolean) {
    this.ismentor = is;
  }
  onFormSubmit(form: NgForm) {
    if (this.ismentor === true) {
      this.mentorService.addMentor(form)
        .subscribe((res: { [x: string]: any; }) => {
          this.toastr.success('Register succesful !!! Please confirm your mail');
          this.router.navigate(['/sign-in']);
        }, (err) => {
          console.log(err);
          this.toastr.error('Email is already used');
        });
    } else {
      this.traineeService.addTrainee(form)
        .subscribe((res: { [x: string]: any; }) => {
          this.toastr.success('Register succesful');
          this.router.navigate(['/sign-in']);
        }, (err) => {
          console.log(err);
          this.toastr.error('Email is already used');
        });
    }
  }
}
