import { Component, OnInit } from '@angular/core';
import { Trainee } from '../shared/models/trainee.model';
import { Subscription } from 'rxjs';
import { TraineeService } from '../shared/services/trainee.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { CourseService } from '../shared/services/course.service';
import { Role } from '../shared/models/role.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  currentUserSubscription: Subscription;
  show = false;
  roles: Role;
  constructor(
    private authService: AuthService,
    private router: Router,
    public cate: CourseService
  ) {
  }

  ngOnInit() {
    this.cate.getCateList();
    this.authService.roles.subscribe(x => this.roles = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  get isTrainee() {
    return localStorage.getItem('roles') === 'Trainee';
  }
  get isMentor() {
    return localStorage.getItem('roles') === 'Mentor';
  }
  get isLogin() {
    return localStorage.getItem('currentUser');
  }
}
