import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { UpdateAssignedComponent } from '../update-assigned/update-assigned.component';
import { MatDialog } from '@angular/material';
import { Assigned } from 'src/app/shared/models/assigned.model';
import { AssignedService } from 'src/app/shared/services/assigned.service';
@Component({
  selector: 'app-admin-assigned-list',
  templateUrl: './assigned-list.component.html',
  styleUrls: ['./assigned-list.component.css']
})
export class AdminAssignedListComponent implements OnInit {

  public searchText: string;
  p: number = 1;
  allAssigned: Observable<Assigned[]>;

  item: number = 10;
  options: any[] = [
    { id: 1, value: 'show 5' },
    { id: 2, value: 'show 10' },
    { id: 3, value: 'show 20' },
    { id: 4, value: 'show all' },
  ];
  selected: number = 2;

  constructor(
    private servicessigned: AssignedService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.loadAllAssigned();
  }

  loadAllAssigned() {
    this.allAssigned = this.servicessigned.getAllAssigned();
  }

  deleteAssign(courseid, mentorid) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.servicessigned.deleteAssignById(courseid, mentorid).subscribe(() => {
        this.toastr.success('Delete is successfully!', 'Notification');
        this.loadAllAssigned();
      });
    }
  }

  onEdit(ass: any[]) {
    UpdateAssignedComponent.detailAssigned = ass;
    const dialogRef = this.dialog.open(UpdateAssignedComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllAssigned();
    });
  }
  selectOption(id: number) {
    if (id == 1) {
      return this.item = 5;
    }
    if (id == 2) {
      this.item = 10;
    }
    if (id == 3) {
      this.item = 20;
    }
    if (id == 4) {
      this.item = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    }
  }
}
