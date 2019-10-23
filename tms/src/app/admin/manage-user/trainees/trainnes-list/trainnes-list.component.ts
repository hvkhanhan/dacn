import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';
import { AddTraineeComponent } from '../add-trainee/add-trainee.component';
import { UpdateTraineeComponent } from '../update-trainee/update-trainee.component';
import { Trainee } from 'src/app/shared/models/trainee.model';
import { TraineeService } from 'src/app/shared/services/trainee.service';

@Component({
  selector: 'app-trainnes-list',
  templateUrl: './trainnes-list.component.html',
  styleUrls: ['./trainnes-list.component.css']
})
export class TrainnesListComponent implements OnInit {

  public searchText: string;
  allTrainee: Observable<Trainee[]>;
  p: number = 1;

  item: number = 10;
  options: any[] = [
    { id: 1, value: 'show 5' },
    { id: 2, value: 'show 10' },
    { id: 3, value: 'show 20' },
    { id: 4, value: 'show all' },
  ];
  selected: number = 2;

  constructor(
    private servicetrainee: TraineeService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadlisttrainee();
  }

  loadlisttrainee() {
    this.allTrainee = this.servicetrainee.listtrainee();
  }

  onDelete(traineeid: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.servicetrainee.deletetrainee(traineeid).subscribe(res => {
        this.toastr.success('successfully deleted!', 'Notification');
        this.loadlisttrainee();
      });
    }
  }
  onCreate() {
    const dialogRef = this.dialog.open(AddTraineeComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadlisttrainee();
    });
  }

  onEdit(tra: any[]) {
    UpdateTraineeComponent.detailTrainee = tra;
    const dialogRef = this.dialog.open(UpdateTraineeComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadlisttrainee();
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
