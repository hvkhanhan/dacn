import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material';
import { Skill } from 'src/app/shared/models/skill.model';
import { SkillService } from 'src/app/shared/services/skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  skill : Skill;
  formfroupAdd: FormGroup;
  constructor(
    private toastr: ToastrService,
    private router: Router ,
    private formbuilder: FormBuilder,
    private serviceskill: SkillService,
    public dialogRef: MatDialogRef<AddSkillComponent>
  ) { }

  ngOnInit() {
    this.formfroupAdd = this.formbuilder.group({
      skillname: [null, [Validators.required]],
    });
  }

  onSubmit(skill: Skill){
    console.log(skill);
    this.serviceskill.addskill(skill)
        .subscribe(() => {
          this.toastr.success('Create is successfully!','Notification');
          this.router.navigate(['/admin/skill-list']);
          this.onClose();
   });
  }

  onClose(){
    this.dialogRef.close();
  }
}
