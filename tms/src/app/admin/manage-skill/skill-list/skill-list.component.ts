import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { AddSkillComponent } from '../add-skill/add-skill.component';
import { UpdateSkillComponent } from '../update-skill/update-skill.component';
import { Skill } from 'src/app/shared/models/skill.model';
import { SkillService } from 'src/app/shared/services/skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  public searchText: string;
  p: number = 1;
  allSkill: Observable<Skill[]>;

  item: number = 10;
  options: any[] = [
    { id: 1, value: 'show 5' },
    { id: 2, value: 'show 10' },
    { id: 3, value: 'show 20' },
    { id: 4, value: 'show all' },
  ];
  selected: number = 2;

  constructor(
    private serviceskill: SkillService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loadAllSkill();
  }

  loadAllSkill() {
    this.allSkill = this.serviceskill.getAllSkill();
  }

  deleteSkill(idskill) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.serviceskill.deleteSkillById(idskill).subscribe(() => {
        this.toastr.success('Delete is successfully!', 'Notification');
        this.loadAllSkill();
      });
    }
  }

  onCreate() {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAllSkill();
    });
  }

  onEdit(ski: any[]) {
    UpdateSkillComponent.detailSkill = ski;
    const dialogRef = this.dialog.open(UpdateSkillComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllSkill();
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
