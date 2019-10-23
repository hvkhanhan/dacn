import { Component, OnInit } from '@angular/core';
import { AssignedService } from '../shared/services/assigned.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Assigned } from '../shared/models/assigned.model';
@Component({
  selector: 'app-course-assigned',
  templateUrl: './course-assigned.component.html',
  styleUrls: ['./course-assigned.component.css']
})
export class CourseAssignedComponent implements OnInit {

  constructor() { }
  ngOnInit() { }
}
