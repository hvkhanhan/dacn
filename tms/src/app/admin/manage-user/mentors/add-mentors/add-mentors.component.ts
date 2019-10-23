import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { Mentor } from 'src/app/shared/models/mentor.model';
import { MentorService } from 'src/app/shared/services/mentor.service';


@Component({
  selector: 'app-add-mentors',
  templateUrl: './add-mentors.component.html',
  styleUrls: ['./add-mentors.component.css']
})
export class AddMentorsComponent implements OnInit {

  mentor: Mentor;
  formfroupAdd: FormGroup;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formbuilder: FormBuilder,
    private servicementor: MentorService,
    public dialogRef: MatDialogRef<AddMentorsComponent>
  ) { }

  ngOnInit() {
    this.formfroupAdd = this.formbuilder.group({
      name: [null, null],
      email: [null, [Validators.required]],
      phone: [null, null],
      address: [null, null],
      password: [null, null],
      idskill: [null, null]
    });
  }
  onSubmit(mentor: any) {
    console.log(mentor);
    this.servicementor.addMentor(mentor)
      .subscribe(() => {
        this.toastr.success('Create is successfully!', 'Notification');
        this.router.navigate(['/admin/user-mentor-list']);
        this.onClose();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
