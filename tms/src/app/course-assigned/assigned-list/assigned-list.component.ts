import { Component, OnInit } from '@angular/core';
import { AssignedService } from 'src/app/shared/services/assigned.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assigned-list',
  templateUrl: './assigned-list.component.html',
  styleUrls: ['./assigned-list.component.css']
})
export class AssignedListComponent implements OnInit {
  id: number;
  constructor(
    private servicessigned: AssignedService,
    protected servicess: AssignedService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  public searchText: string;
  p: number = 1;
  allAssigned: Observable<any[]>;
  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    console.log(result);
    this.id = result[0];
    this.role();
    this.servicess.listmanagepostmentor();
    // this.loadAllAssigned();
  }

  loadAllAssigned() {
    this.allAssigned = this.servicessigned.getAssignedFollowMentor(this.id);
  }
  deleteassign(courseid: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.servicessigned.deleteAssignById(courseid, this.id).subscribe(() => {
        this.toastr.success('Delete is successfully!', 'Notification');
        this.loadAllAssigned();
      });
    }
  }
  role() {

    if (localStorage.getItem('roles') === 'Mentor') {
      this.allAssigned = this.servicessigned.getAssignedFollowMentor(this.id);
    } else {
      this.allAssigned = this.servicessigned.getAssignedFollowTrainee(this.id);
    }
  }
}
