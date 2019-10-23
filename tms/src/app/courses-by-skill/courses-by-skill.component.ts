import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-courses-by-skill',
  templateUrl: './courses-by-skill.component.html',
  styleUrls: ['./courses-by-skill.component.css']
})
export class CoursesBySkillComponent implements OnInit {
  constructor() {

  }
  ngOnInit() {

  }
}
