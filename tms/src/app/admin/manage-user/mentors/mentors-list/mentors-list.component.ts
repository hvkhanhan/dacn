import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddMentorsComponent } from '../add-mentors/add-mentors.component';
import { UpdateMentorsComponent } from '../update-mentors/update-mentors.component';
import { Mentor } from 'src/app/shared/models/mentor.model';
import { MentorService } from 'src/app/shared/services/mentor.service';
@Component({
  selector: 'app-mentors-list',
  templateUrl: './mentors-list.component.html',
  styleUrls: ['./mentors-list.component.css']
})


export class MentorsListComponent implements OnInit {

  allMentor: Observable<Mentor[]>;
  searchText: string;
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
    private servicementor: MentorService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.loadlistmentor();
  }

  loadlistmentor() {
    this.allMentor = this.servicementor.listmentors();
  }

  onDelete(mentorid: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.servicementor.deletementor(mentorid).subscribe(res => {
        this.toastr.success('successfully deleted!', 'Notification');
        this.loadlistmentor();
      });
    }
  }
  onCreate() {
    const dialogRef = this.dialog.open(AddMentorsComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadlistmentor();
    });
  }
  onEdit(men: any[]) {
    UpdateMentorsComponent.detailMentor = men;
    const dialogRef = this.dialog.open(UpdateMentorsComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadlistmentor();
    });
  }

  selectOption(id: number) {
    if (id === 1) {
      return this.item = 5;
    }
    if (id === 2) {
      this.item = 10;
    }
    if (id === 3) {
      this.item = 20;
    }
    if (id === 4) {
      this.item = 999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    }
  }
}
