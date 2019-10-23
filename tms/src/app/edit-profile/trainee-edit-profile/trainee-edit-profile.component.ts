import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormGroup } from '@angular/forms';
import { TraineeService } from 'src/app/shared/services/trainee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-trainee-edit-profile',
  templateUrl: './trainee-edit-profile.component.html',
  styleUrls: ['./trainee-edit-profile.component.css']
})
export class TraineeEditProfileComponent implements OnInit {

  traineeEditform: FormGroup;
  traineeid: number;

  constructor(
    private formbuilder: FormBuilder,
    private traineeService: TraineeService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    this.traineeid = result[0];
    this.traineeEditform = this.formbuilder.group({
      ['traineeid']: [null, [Validators.required]],
      ['name']: [null, [Validators.required]],
      ['email']: [null, [Validators.required]],
      ['phone']: [null, [Validators.required]],
      ['address']: [null, [Validators.required]],
      ['password']: [null, null],
      ['isActive']: [null, null],
      ['activationcode']: [null, null],
      ['resetpasswordcode']: [null, null]
    });
    this.getTrainee(this.traineeid);
  }
  onFormSubmit(form: NgForm) {
    this.traineeService.putTrainee(this.traineeid, form)
      .subscribe(res => {
        this.toastr.success('Success');
        this.router.navigate(['']);
      }, (err) => {
        console.log(err);
      });
  }

  getTrainee(traineeid: number) {
    this.traineeService.getTraineeById(traineeid).subscribe(data => {
      // console.log(data);
      this.traineeid = data.traineeid;
      this.traineeEditform.setValue({
        traineeid: data.traineeid,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
        isActive: data.isActive,
        activationcode: data.activationcode,
        resetpasswordcode: data.resetpasswordcode
      });
    });
  }
}
