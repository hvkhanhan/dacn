import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-list-by-skill',
  templateUrl: './list-by-skill.component.html',
  styleUrls: ['./list-by-skill.component.css']
})
export class ListBySkillComponent implements OnInit {

  public searchText: string;
  p = 1;
  all: any = [];
  skillid: number;
  mentorid: number;
  constructor(
    protected courseService: CourseService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const temp = this.authService.currentUserValue;
    const result = Object.keys(temp).map(e => temp[e]);
    console.log(result[7]);
    this.mentorid = result[0];
    this.skillid = result[7];
    this.loadData();
  }
  onSend(id) {
    this.courseService.sendMail(this.mentorid, id)
      .subscribe(() => {
        this.loadData();
        this.toastr.success('Done');
      });
  }
  loadData() {
    this.all = this.courseService.retatedcourseslist(this.skillid);
  }
}
