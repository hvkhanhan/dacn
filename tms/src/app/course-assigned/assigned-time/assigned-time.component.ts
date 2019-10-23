import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AssignedService } from 'src/app/shared/services/assigned.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-assigned-time',
  templateUrl: './assigned-time.component.html',
  styleUrls: ['./assigned-time.component.css']
})
export class AssignedTimeComponent implements OnInit {

  subscription: Subscription;
  subscriptionParams: Subscription;
  editassigned: FormGroup;
  courseid: string;
  traineecourse = 1;
  show = false;

  constructor(
    private formbuilder: FormBuilder,
    public assignedService: AssignedService,
    private toastr: ToastrService,
    private router: Router,
    public activatedRouteService: ActivatedRoute
  ) { }
  ngOnInit() {
    this.editassigned = this.formbuilder.group({
      courseid: [null, [Validators.required]],
      mentorid: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      startday: [null, [Validators.required]],
      endday: [null, [Validators.required]],
      address: [null, null],
      time: [null, null],

    });

    this.loadCourseid();
  }

  loadCourseid() {
    this.subscriptionParams = this.activatedRouteService.params.subscribe((data: Params) => {
      console.log(data);
      this.courseid = data.id;
      this.getcourses(this.courseid);
    });
  }
  getcourses(courseid: string) {
    this.assignedService.getCourseById(courseid).subscribe(Assigned => {
      console.log(Assigned);
      this.editassigned.controls.courseid.setValue(Assigned.courseid);
      this.editassigned.controls.mentorid.setValue(Assigned.mentorid);
      this.editassigned.controls.notes.setValue(Assigned.notes);
      this.editassigned.controls.startday.setValue(Assigned.startday);
      this.editassigned.controls.endday.setValue(Assigned.endday);
      this.editassigned.controls.address.setValue(Assigned.address);
      this.editassigned.controls.time.setValue(Assigned.time);
    });
  }

  onFormSubmit(form: NgForm) {
    this.assignedService.putassigned(this.courseid, form)
      .subscribe(res => {
        this.toastr.success('Edit Successfully');
        this.router.navigate(['/assign']);
      }, (err) => {
        console.log(err);
      });
  }
}
