import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TraineeService } from 'src/app/shared/services/trainee.service';
import { Trainee } from 'src/app/shared/models/trainee.model';


@Component({
  selector: 'app-update-trainee',
  templateUrl: './update-trainee.component.html',
  styleUrls: ['./update-trainee.component.css']
})
export class UpdateTraineeComponent implements OnInit {

  formfroupEdit: FormGroup;
  public static detailTrainee: any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formbuilder: FormBuilder,
    private servicetrainee: TraineeService,
    public activatedRouterService: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateTraineeComponent>
  ) { }

  ngOnInit() {
    var temp = UpdateTraineeComponent.detailTrainee;
    var result = Object.keys(temp).map(e => temp[e]);
    UpdateTraineeComponent.detailTrainee = result;
    console.log(UpdateTraineeComponent.detailTrainee);

    this.formfroupEdit = this.formbuilder.group({
      traineeid: [null, null],
      name: [null, null],
      email: [null, [Validators.required]],
      phone: [null, null],
      address: [null, null],
      password: [null, null],
      activationcode: [null]
    });

    this.loadTraineeToEdit();
  }

  loadTraineeToEdit() {
    this.formfroupEdit.controls.traineeid.setValue(UpdateTraineeComponent.detailTrainee[0]);
    this.formfroupEdit.controls.name.setValue(UpdateTraineeComponent.detailTrainee[1]);
    this.formfroupEdit.controls.email.setValue(UpdateTraineeComponent.detailTrainee[2]);
    this.formfroupEdit.controls.phone.setValue(UpdateTraineeComponent.detailTrainee[3]);
    this.formfroupEdit.controls.address.setValue(UpdateTraineeComponent.detailTrainee[4]);
    this.formfroupEdit.controls.password.setValue(UpdateTraineeComponent.detailTrainee[6]);
    this.formfroupEdit.controls.activationcode.setValue(UpdateTraineeComponent.detailTrainee[7]);
  }

  onSubmit(trainee: any) {
    console.log(trainee.traineeid);
    this.servicetrainee.putTrainee(trainee.traineeid , trainee)
      .subscribe(res => {
        this.toastr.success('Update is successfully!', 'Notification');
        this.router.navigate(['/admin/user-trainee-list']);
        this.onClose();
      }, (err) => {
        console.log(err);
      });
  }

  onClose() {
    this.dialogRef.close();
  }

}
