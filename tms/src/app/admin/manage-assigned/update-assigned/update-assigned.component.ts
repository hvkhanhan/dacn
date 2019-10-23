import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialogRef } from '@angular/material';
import { AssignedService } from 'src/app/shared/services/assigned.service';
import { Assigned } from 'src/app/shared/models/assigned.model';


@Component({
  selector: 'app-update-assigned',
  templateUrl: './update-assigned.component.html',
  styleUrls: ['./update-assigned.component.css']
})
export class UpdateAssignedComponent implements OnInit {

  formfroupEdit: FormGroup;
  formfroupName : FormGroup;
  public static detailAssigned: any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router ,
    private formbuilder: FormBuilder,
    private servicessigned: AssignedService,
    public activatedRouterService: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateAssignedComponent>
  ) { }

  ngOnInit() {
    var temp = UpdateAssignedComponent.detailAssigned;
    var result = Object.keys(temp).map(e => temp[e]);
    UpdateAssignedComponent.detailAssigned = result;
    console.log(UpdateAssignedComponent.detailAssigned);

    this.formfroupEdit = this.formbuilder.group({
      mentorid: [null, [Validators.required]],
      courseid: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      startday: [null, null],
      endday: [null, null],
      address: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });
    this.formfroupName = this.formbuilder.group({
      mentor: [null, [Validators.required]],
      course: [null, [Validators.required]],
    });
    this.loadassignToEdit();
  }

  loadassignToEdit() {
      this.formfroupName.controls.mentor.setValue(UpdateAssignedComponent.detailAssigned[2]);
      this.formfroupName.controls.course.setValue(UpdateAssignedComponent.detailAssigned[1]);
      this.formfroupEdit.controls.mentorid.setValue(UpdateAssignedComponent.detailAssigned[0]);
      this.formfroupEdit.controls.courseid.setValue(UpdateAssignedComponent.detailAssigned[4]);
      this.formfroupEdit.controls.notes.setValue(UpdateAssignedComponent.detailAssigned[9]);
      this.formfroupEdit.controls.startday.setValue(UpdateAssignedComponent.detailAssigned[6]);
      this.formfroupEdit.controls.endday.setValue(UpdateAssignedComponent.detailAssigned[7]);
      this.formfroupEdit.controls.address.setValue(UpdateAssignedComponent.detailAssigned[8]);
      this.formfroupEdit.controls.time.setValue(UpdateAssignedComponent.detailAssigned[10]);
  }

  onSubmit(assign: Assigned){
    console.log(assign);
    this.servicessigned.updateassign(assign)
        .subscribe( res => {
          this.toastr.success('Update is successfully!','Notification');
          this.router.navigate(['/admin/assigned-list']);
          this.onClose();
        },(err) =>{
          console.log(err);
   });
  }

  onClose(){
    this.dialogRef.close();
  }

}
