import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { UpdateCourseComponent } from '../update-course/update-course.component';
import { CourseService } from 'src/app/shared/services/course.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public searchText: string;
  p = 1;
  allCourse: Observable<Course[]>;

  item = 10;
  options: any[] = [
    { id: 1, value: 'show 5' },
    { id: 2, value: 'show 10' },
    { id: 3, value: 'show 20' },
    { id: 4, value: 'show all' },
  ];
  selected = 2;

  constructor(
    private servicecourse: CourseService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadAllcourse();
  }

  loadAllcourse() {
    this.allCourse = this.servicecourse.getAllCourse();
  }

  deleteCourse(courseid) {
    if (confirm('Are you sure you want to delete this ?')) {
      this.servicecourse.deleteCoursesByTraineeId(courseid).subscribe(() => {
        this.toastr.success('Delete is successfully!', 'Notification');
        this.loadAllcourse();
      });
    }
  }


  onEdit(cate: any[]) {
    UpdateCourseComponent.detailcourse = cate;
    const dialogRef = this.dialog.open(UpdateCourseComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllcourse();
    });
  }

  selectOption(id: number) {
    if (id === 1) {
      return this.item = 5;
    }
    if (id === 2) {
      this.item = 10;
    }
    if (id === 3) {
      this.item = 20;
    }
    if (id === 4) {
      this.item = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    }
  }
}
