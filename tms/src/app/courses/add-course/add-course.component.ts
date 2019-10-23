import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/shared/services/course.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  addCourseForm: FormGroup;
  traineeid: number;
  show = false;
  fileToUpload: File = null;
  imagePath: string;

  constructor(
    private formBuilder: FormBuilder,
    protected courseService: CourseService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    this.traineeid = result[0];
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    this.courseService.getSkill();
    this.addCourseForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, null],
      city: ['Hồ Chí Minh', Validators.required],
      address: [null, Validators.required],
      time: [null, null],
      status: [0, Validators.required],
      idskill: [1, Validators.required],
      trainee_course: [this.traineeid, Validators.required],
      image_course: [null]
    });
  }
  change() {
    console.log(this.show);
    if (this.show === false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  onFormSubmit(form: NgForm) {
    console.log(form);
    this.courseService.addCourse(form)
      .subscribe((res: { [x: string]: any; }) => {
        this.router.navigate(['/courses']);
      });
  }
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addCourseForm.get('image_course').setValue(file);
      console.log(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.addCourseForm.get('title').value);
    formData.append('description', this.addCourseForm.get('description').value);
    formData.append('city', this.addCourseForm.get('city').value);
    formData.append('address', this.addCourseForm.get('address').value);
    formData.append('time', this.addCourseForm.get('time').value);
    formData.append('status', this.addCourseForm.get('status').value);
    formData.append('idskill', this.addCourseForm.get('idskill').value);
    formData.append('trainee_course', this.addCourseForm.get('trainee_course').value);
    formData.append('image_course', this.addCourseForm.get('image_course').value);

    this.courseService.addCourse(formData)
      .subscribe((res) => {
        this.router.navigate(['/courses']);
      },
        (error) => {
          this.toastr.error('Add False');
          console.log(error);
          if (error === 500) {
            this.toastr.error('Add False');
          }
        }
      );
  }
}

