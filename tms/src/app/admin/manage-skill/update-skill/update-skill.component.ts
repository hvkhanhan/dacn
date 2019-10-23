import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialogRef } from '@angular/material';
import { SkillService } from 'src/app/shared/services/skill.service';
import { Skill } from 'src/app/shared/models/skill.model';


@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.css']
})
export class UpdateSkillComponent implements OnInit {

  formfroupEdit: FormGroup;
  public static detailSkill: any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formbuilder: FormBuilder,
    private skillservice: SkillService,
    public activatedRouterService: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateSkillComponent>
  ) { }

  ngOnInit() {
    var temp = UpdateSkillComponent.detailSkill;
    var result = Object.keys(temp).map(e => temp[e]);
    UpdateSkillComponent.detailSkill = result;
    console.log(UpdateSkillComponent.detailSkill);

    this.formfroupEdit = this.formbuilder.group({
      idskill: [null, null],
      skillname: [null, [Validators.required]],
    });

    this.loadSkillToEdit();
  }

  loadSkillToEdit() {
    this.formfroupEdit.controls.idskill.setValue(UpdateSkillComponent.detailSkill[0]);
    this.formfroupEdit.controls.skillname.setValue(UpdateSkillComponent.detailSkill[1]);
  }

  onSubmit(skill: Skill) {
    this.skillservice.updateskill(skill)
      .subscribe(res => {
        this.toastr.success('Update is successfully!', 'Notification');
        this.router.navigate(['/admin/skill-list']);
        this.onClose();
      }, (err) => {
        console.log(err);
      });
  }

  onClose() {
    this.dialogRef.close();
  }

}
