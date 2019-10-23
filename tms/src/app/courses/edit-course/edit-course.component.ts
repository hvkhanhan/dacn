import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  subscription: Subscription;
  subscriptionParams: Subscription;
  editcoursesform: FormGroup;
  courseid: string;
  // traineecourse = 9;
  show = false;
  status: number;

  constructor(
    private formbuilder: FormBuilder,
    public courseService: CourseService,
    private toastr: ToastrService,
    private router: Router,
    public activatedRouteService: ActivatedRoute
  ) { }
  ngOnInit() {
    this.editcoursesform = this.formbuilder.group({
      courseid: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      city: [null, [Validators.required]],
      address: [null, [Validators.required]],
      time: [null, null],
      createddate: [null, null],
      status: [null, null],
      idskill: [null, null],
      trainee_course: [null, null]
    });
    this.courseService.getSkill();
    this.loadCourseid();
  }
  change() {
    console.log(this.show);
    if (this.show === false) {
      this.show = true;
      this.editcoursesform.controls.time.setValue('');
    } else {
      this.show = false;
      this.editcoursesform.controls.time.setValue('2,4,6');
    }
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

      this.editcoursesform.controls.courseid.setValue(course.courseid);
      this.editcoursesform.controls.title.setValue(course.title);
      this.editcoursesform.controls.description.setValue(course.description);
      this.editcoursesform.controls.city.setValue(course.city);
      this.editcoursesform.controls.address.setValue(course.address);
      if (course.time !== '2,4,6' && course.time !== '3,5,7') {
        this.show = true;
        this.editcoursesform.controls.time.setValue(course.time);
      } else {
        this.show = false;
        this.editcoursesform.controls.time.setValue(course.time);
      }
      this.editcoursesform.controls.idskill.setValue(course.idskill);
      this.editcoursesform.controls.status.setValue(course.status);
      this.status = course.status;
      this.editcoursesform.controls.createddate.setValue(course.createddate);
      this.editcoursesform.controls.trainee_course.setValue(course.trainee_course);
    });
  }

  onFormSubmit(form: NgForm) {
    this.courseService.putCourse(this.courseid, form)
      .subscribe(res => {
        this.toastr.success('Edit Successfully');
        this.router.navigate(['/courses']);
      }, (err) => {
        console.log(err);

      });
  }
  onCancel() {
    this.router.navigate(['/courses']);
  }
}
