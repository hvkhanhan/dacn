import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MentorService } from 'src/app/shared/services/mentor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-mentor',
  templateUrl: './reset-mentor.component.html',
  styleUrls: ['./reset-mentor.component.css']
})
export class ResetMentorComponent implements OnInit {

  isLoginError: boolean = false;

  constructor(
    protected services: MentorService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.services.formData = {
      mentorid: null,
      name: '',
      email: '',
      phone: '',
      address: '',
      isActive: false,
      password: '',
      idskill: '',
      activationcode: '',
      resetpasswordcode: ''
    };
  }

  onSubmit(form: NgForm) {
    this.services.resetpasswordmentor(form.value).subscribe((data: any) => {
      this.router.navigate(['/sign-in']);
      this.toastr.success('Reset Password in successfully!', 'Notification');
    },
      (error: HttpErrorResponse) => {
        this.isLoginError = true;
        this.toastr.warning('Reset Password unsuccessful!', 'Notification');
      });
  }
}
