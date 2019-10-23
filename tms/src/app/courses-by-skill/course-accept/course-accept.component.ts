import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssignedService } from 'src/app/shared/services/assigned.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-course-accept',
  templateUrl: './course-accept.component.html',
  styleUrls: ['./course-accept.component.css']
})
export class CourseAcceptComponent implements OnInit {
  acceptCourseForm: FormGroup;
  subscription: Subscription;
  subscriptionParams: Subscription;
  courseid: string;
  mentorid: number;
  constructor(
    private formBuilder: FormBuilder,
    public activatedRouteService: ActivatedRoute,
    public assignService: AssignedService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    this.mentorid = result[0];
    this.loadCourseid();
    this.acceptCourseForm = this.formBuilder.group({
      courseid: [this.courseid, Validators.required],
      mentorid: [this.mentorid, Validators.required],
      startday: [null, Validators.required],
      endday: [null, Validators.required],
      time: [null, null],
      notes: [null, null],
      address: [null, null],
    });
  }
  onFormSubmit(form: NgForm) {
    this.assignService.addAssign(form)
      .subscribe((res: { [x: string]: any; }) => {
        this.router.navigate(['/mentor-courses']);
      });

  }
  loadCourseid() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data: Params) => {
      console.log(data);
      this.courseid = data.id;
    });
  }
}
