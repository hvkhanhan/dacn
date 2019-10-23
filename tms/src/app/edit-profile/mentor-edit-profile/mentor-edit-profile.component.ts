import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MentorService } from '../../shared/services/mentor.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mentor-edit-profile',
  templateUrl: './mentor-edit-profile.component.html',
  styleUrls: ['./mentor-edit-profile.component.css']
})
export class MentorEditProfileComponent implements OnInit {

  mentorEditform: FormGroup;
  mentorid: number;

  constructor(
    private formbuilder: FormBuilder,
    public mentorService: MentorService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) { }
  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    this.mentorid = result[0];

    this.mentorEditform = this.formbuilder.group({
      mentorid: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      idskill: [null, null],
      password: [null, null],
      isActive: [null, null],
      activationcode: [null, null],
      resetpasswordcode: [null, null]
    });
    this.mentorService.getMentorSkill();
    this.getMentor(this.mentorid);
  }
  getMentor(mentorid: number) {
    this.mentorService.getMentorById(mentorid).subscribe(mentor => {
      console.log(mentor);
      // this.mentorid = mentor.mentorid;
      this.mentorEditform.controls.mentorid.setValue(mentor.mentorid);
      this.mentorEditform.controls.name.setValue(mentor.name);
      this.mentorEditform.controls.email.setValue(mentor.email);
      this.mentorEditform.controls.phone.setValue(mentor.phone);
      this.mentorEditform.controls.address.setValue(mentor.address);
      this.mentorEditform.controls.idskill.setValue(mentor.idskill);
      this.mentorEditform.controls.password.setValue(mentor.password);
      this.mentorEditform.controls.isActive.setValue(mentor.isActive);
      this.mentorEditform.controls.activationcode.setValue(mentor.activationcode);
      this.mentorEditform.controls.resetpasswordcode.setValue(mentor.resetpasswordcode);

      // this.mentorEditform.setValue({ 'name': mentor.name });
      // this.mentorEditform.controls.name.setValue(mentor.name);
      // this.mentorEditform.get('name').setValue(mentor.name);

      // this.mentorEditform.setValue({
      //   name: mentor.name,
      //   email: mentor.email,
      //   phone: mentor.phone,
      //   address: mentor.address,
      //   idskill: mentor.idskill,
      //   password: mentor.password,
      //   isActive: mentor.isActive,
      //   activationcode: mentor.activationcode,
      //   resetpasswordcode: mentor.resetpasswordcode
      // });
    });
  }
  onFormSubmit(form: NgForm) {
    this.mentorService.putMentor(this.mentorid, form)
      .subscribe(res => {
        this.router.navigate(['']);
        this.toastr.success('Edit Successfully');
      }, (err) => {
        console.log(err);
      });
  }
}
