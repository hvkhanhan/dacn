import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material';
import { Router, Params } from '@angular/router';
import { CourseService } from 'src/app/shared/services/course.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {


  courses: any = [];
  previous: any = [];
  traineeid: number;
  course: any;
  temp = 'title';

  public searchText: string;
  p = 1;

  headElements = ['Course ID', 'Title', 'Category', 'Time', 'Status', ' '];

  constructor(
    protected courseService: CourseService,
    public toastr: ToastrService,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    this.traineeid = result[0];
    this.courses = this.courseService.getCoursesByTraineeId(this.traineeid);

  }
  setButton(num: number) {
    if (num === 0 || num === 1 || num === 2) {
      return false;
    } else {
      return true;
    }
  }
  change(t) {
    this.temp = t;
  }
  onDelete(courseid: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.courseService.deleteCoursesByTraineeId(courseid).subscribe(res => {
        this.courseService.getCoursesByTraineeId(this.traineeid);
        this.toastr.warning('Deleted successfully', 'EMP. Register');
      });
    }
  }
  onView(courseid: string) {
    this.courseService.getCourseById(courseid).subscribe((data: Params) => {
      console.log(data.courseid);
    });
  }
}
