import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/services/course.service';
import { Category } from '../shared/models/category.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-cate-by-id',
  templateUrl: './course-cate-by-id.component.html',
  styleUrls: ['./course-cate-by-id.component.css']
})
export class CourseCateByIdComponent implements OnInit {
  public searchText: string;
  p = 1;
  subscription: Subscription;
  subscriptionParams: Subscription;
  list: any = [];

  constructor(
    protected courseService: CourseService,
    public activatedRouteService: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data: Params) => {
      this.list = this.courseService.GetcourseByCateId(data.id);
    });
  }

}
