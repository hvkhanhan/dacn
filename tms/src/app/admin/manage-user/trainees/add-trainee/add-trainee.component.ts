import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { Trainee } from 'src/app/shared/models/trainee.model';
import { TraineeService } from 'src/app/shared/services/trainee.service';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent implements OnInit {

  trainee: Trainee;
  formfroupAdd: FormGroup;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formbuilder: FormBuilder,
    private servicetrainee: TraineeService,
    public dialogRef: MatDialogRef<AddTraineeComponent>
  ) { }

  ngOnInit() {
    this.formfroupAdd = this.formbuilder.group({
      name: [null, null],
      email: [null, [Validators.required]],
      phone: [null, null],
      address: [null, null],
      password: [null, null],
    });
  }
  onSubmit(trainee: any) {
    console.log(trainee);
    this.servicetrainee.addTrainee(trainee)
      .subscribe(() => {
        this.toastr.success('Create is successfully!', 'Notification');
        this.router.navigate(['/admin/user-trainee-list']);
        this.onClose();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
