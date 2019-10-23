import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/services/course.service';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  ViewCourseForm: FormGroup;
  subscription: Subscription;
  subscriptionParams: Subscription;
  courseid: string;
  idskill: number;
  imagePath: string;
  constructor(
    private formbuilder: FormBuilder,
    public courseService: CourseService,
    private toastr: ToastrService,
    private router: Router,
    public course: CourseService,
    public activatedRouteService: ActivatedRoute
  ) { }
  ngOnInit() {
    this.courseService.getSkill();
    this.loadCourseid();
    this.ViewCourseForm = this.formbuilder.group({
      courseid: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      city: [null, [Validators.required]],
      address: [null, [Validators.required]],
      time: [null, null],
      createddate: [null, null],
      status: ['status', null],
      idskill: [null, null],
      trainee_course: [null, null]
    });
  }

  loadCourseid() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data: Params) => {
      console.log(data);
      this.courseid = data.id;
      this.getcourses(this.courseid);
    });
  }
  getcourses(courseid: string) {
    this.courseService.getCourseById(courseid).subscribe(course => {
      console.log(course);
      this.ViewCourseForm.controls.courseid.setValue(course.courseid);
      this.ViewCourseForm.controls.title.setValue(course.title);
      this.ViewCourseForm.controls.description.setValue(course.description);
      this.ViewCourseForm.controls.city.setValue(course.city);
      this.ViewCourseForm.controls.address.setValue(course.address);
      this.ViewCourseForm.controls.time.setValue(course.time);
      this.ViewCourseForm.controls.idskill.setValue(course.idskill);
      this.ViewCourseForm.controls.status.setValue(course.status);
      this.ViewCourseForm.controls.createddate.setValue(course.createddate);
      this.ViewCourseForm.controls.trainee_course.setValue(course.trainee_course);

      this.idskill = course.idskill;
      console.log(course.idskill);
      this.imagePath = "assets/Images/" + course.image_course;
      // show course theo id skill
      this.course.getCoursesListskill(this.idskill);
    });
  }
}
