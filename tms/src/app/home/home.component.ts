import { Component, OnInit } from '@angular/core';
import { Trainee } from '../shared/models/trainee.model';
import { Subscription } from 'rxjs';
import { TraineeService } from '../shared/services/trainee.service';
import { CourseService } from '../shared/services/course.service';
import { AuthService } from '../shared/services/auth.service';
import { Role } from '../shared/models/role.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchText: string;
  roles: Role;
  constructor(
    public course: CourseService,
    protected authService: AuthService
  ) { }
  ngOnInit() {
    this.authService.roles.subscribe(x => this.roles = x);
    this.course.getCoursesList();
  }
  get isTrainee() {
    return localStorage.getItem('roles') === 'Trainee';
  }

  get isMentor() {
    return localStorage.getItem('roles') === 'Mentor';
  }
}
