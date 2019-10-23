import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { Skill } from '../models/skill.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  formData: Course;
  cateList: Category[];
  courseList: Course[];
  relatedList: Course[];
  courseListById: Course[];
  readonly rootURL = 'http://localhost:59786/api';
  skillList: Skill[];
  constructor(private http: HttpClient) { }

  getCateList() {
    return this.http.get(this.rootURL + '/categories/Getcategories').subscribe(result => {
      this.cateList = result as Category[];
    });
  }
  getCoursesByTraineeId(traineeid: number) {
    return this.http.get(this.rootURL + '/courses/Getcoursefollowtrainee/' + traineeid)
      .toPromise().then(res => this.courseList = res as Course[]);
  }
  getCourseById(courseid: string): Observable<Course> {
    return this.http.get<Course>(this.rootURL + '/courses/Getcourse/' + courseid);
  }
  deleteCoursesByTraineeId(courseid: string) {
    return this.http.delete(this.rootURL + '/courses/Deletecourse/' + courseid);
  }
  addCourse(course) {
    return this.http.post<any>(this.rootURL + '/courses/Postcourse', course);
  }
  putCourse(courseid: string, course: any): Observable<any> {
    // tslint:disable-next-line: no-shadowed-variable
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootURL + '/courses/Putcourse/' + courseid, course, httpOptions);
  }
  getSkill() {
    return this.http.get(this.rootURL + '/skills/Getskills').subscribe(result => {
      this.skillList = result as Skill[];
    });
  }
  // send mentor info for trainee
  sendMail(mentorid, courseid) {
    return this.http.get(this.rootURL + '/courses/SendMailConfirmContact?idmentor=' + mentorid + '&idcourse=' + courseid);
  }
  // change status after sending email ( 0 -> 1)
  // changeStatus(id: any) {
  //   return this.http.post(this.rootURL + ' courses/UpdateStatusContact/' + id);
  // }
  retatedcourseslist(skillid: number) {
    return this.http.get(this.rootURL + '/mentors/Getcoursefollowskillid/ ' + skillid)
      .subscribe(result => {
        this.relatedList = result as Course[];
      });
  }
  getCoursesList() {
    return this.http.get(this.rootURL + '/courses/Getcourses').subscribe(list => {
      this.courseList = list as Course[];
    });
  }
  // courses/Getcoursefollowcategory/{categoryid}
  GetcourseByCateId(categoryid: number) {
    return this.http.get(this.rootURL + '/courses/Getcoursefollowcategory/' + categoryid)
      .subscribe(list => { this.courseListById = list as Course[]; });
  }

  //get course list theo skill

  getCoursesListskill(skillid: number) {
    return this.http.get(this.rootURL + '/mentors/Getcoursefollowskillid/' + skillid).subscribe(list => {
      this.courseList = list as Course[];
    });
  }
  getAllCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(this.rootURL + '/courses/Getcourses');
  }

  deletecourseById(courseid: string) {
    return this.http.delete(this.rootURL + '/courses/' + courseid);
  }
}



