import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialogRef } from '@angular/material';
import { MentorService } from 'src/app/shared/services/mentor.service';
import { Mentor } from 'src/app/shared/models/mentor.model';


@Component({
  selector: 'app-update-mentors',
  templateUrl: './update-mentors.component.html',
  styleUrls: ['./update-mentors.component.css']
})
export class UpdateMentorsComponent implements OnInit {

  formfroupEdit: FormGroup;
  public static detailMentor: any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formbuilder: FormBuilder,
    private servicementor: MentorService,
    public activatedRouterService: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateMentorsComponent>
  ) { }

  ngOnInit() {
    var temp = UpdateMentorsComponent.detailMentor;
    var result = Object.keys(temp).map(e => temp[e]);
    UpdateMentorsComponent.detailMentor = result;
    console.log(UpdateMentorsComponent.detailMentor);

    this.formfroupEdit = this.formbuilder.group({
      mentorid: [null, null],
      name: [null, null],
      email: [null, [Validators.required]],
      phone: [null, null],
      address: [null, null],
      password: [null, null],
      // skill: [null, null],
      idskill: [null, null],
      activationcode: [null]
    });

    this.loadmentorToEdit();
  }

  loadmentorToEdit() {
    this.formfroupEdit.controls.mentorid.setValue(UpdateMentorsComponent.detailMentor[0]);
    this.formfroupEdit.controls.name.setValue(UpdateMentorsComponent.detailMentor[1]);
    this.formfroupEdit.controls.email.setValue(UpdateMentorsComponent.detailMentor[2]);
    this.formfroupEdit.controls.phone.setValue(UpdateMentorsComponent.detailMentor[3]);
    this.formfroupEdit.controls.address.setValue(UpdateMentorsComponent.detailMentor[4]);
    this.formfroupEdit.controls.password.setValue(UpdateMentorsComponent.detailMentor[6]);
    // this.formfroupEdit.controls.skill.setValue(UpdateMentorsComponent.detailMentor[7]);
    this.formfroupEdit.controls.idskill.setValue(UpdateMentorsComponent.detailMentor[7]);
    this.formfroupEdit.controls.activationcode.setValue(UpdateMentorsComponent.detailMentor[8]);
  }

  onSubmit(mentor: any) {
    console.log(mentor);
    this.servicementor.putMentor(mentor.mentorid, mentor)
      .subscribe(res => {
        this.toastr.success('Update is successfully!', 'Notification');
        this.router.navigate(['/admin/user-mentor-list']);
        this.onClose();
      }, (err) => {
        console.log(err);
      });
  }

  onClose() {
    this.dialogRef.close();
  }

}
