import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/services/course.service';

@Component({
  selector: 'app-courses-all',
  templateUrl: './courses-all.component.html',
  styleUrls: ['./courses-all.component.css']
})
export class CoursesAllComponent implements OnInit {
  public searchText: string;
  constructor(
    public course: CourseService
  ) { }
  ngOnInit() {
    this.course.getCoursesList();
  }

}
