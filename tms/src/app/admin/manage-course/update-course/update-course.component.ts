import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course.service';


@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  formfroupEdit: FormGroup;
  public static detailcourse: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servicecourse: CourseService,
    public activatedRouterService: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateCourseComponent>
  ) { }

  ngOnInit() {
    var temp = UpdateCourseComponent.detailcourse;
    var result = Object.keys(temp).map(e => temp[e]);
    UpdateCourseComponent.detailcourse = result;
    console.log(UpdateCourseComponent.detailcourse);

    this.formfroupEdit = this.formBuilder.group({
      courseid: [null, Validators.required],
      title: [null, Validators.required],
      // nametrainee: [null, Validators.required],
      description: [null, null],
      city: ['Hồ Chí Minh', Validators.required],
      address: [null, Validators.required],
      time: [null, null],
      createddate: [null],
      nametrainee: [null],
      status: [0, Validators.required],
      idskill: [null, Validators.required],
      isnotification: [null],
      trainee_course: [null, Validators.required],
    });
    this.loadCourseToEdit();
  }

  loadCourseToEdit() {
    this.formfroupEdit.controls.courseid.setValue(UpdateCourseComponent.detailcourse[0]);
    this.formfroupEdit.controls.title.setValue(UpdateCourseComponent.detailcourse[1]);
    this.formfroupEdit.controls.description.setValue(UpdateCourseComponent.detailcourse[2]);
    this.formfroupEdit.controls.city.setValue(UpdateCourseComponent.detailcourse[3]);
    this.formfroupEdit.controls.address.setValue(UpdateCourseComponent.detailcourse[4]);
    this.formfroupEdit.controls.time.setValue(UpdateCourseComponent.detailcourse[5]);
    this.formfroupEdit.controls.createddate.setValue(UpdateCourseComponent.detailcourse[6]);
    this.formfroupEdit.controls.isnotification.setValue(UpdateCourseComponent.detailcourse[8]);
    this.formfroupEdit.controls.status.setValue(UpdateCourseComponent.detailcourse[7]);
    this.formfroupEdit.controls.idskill.setValue(UpdateCourseComponent.detailcourse[9]);
    this.formfroupEdit.controls.nametrainee.setValue(UpdateCourseComponent.detailcourse[12]);
    this.formfroupEdit.controls.trainee_course.setValue(UpdateCourseComponent.detailcourse[10]);
  }
  onClose() {
    this.dialogRef.close();
  }
  onFormSubmit(form) {
    console.log(form);
    this.servicecourse.putCourse(form.courseid, form)
      .subscribe(res => {

        this.router.navigate(['/admin/course-list']);
      }, (err) => {
        console.log(err);

      });
  }
}
