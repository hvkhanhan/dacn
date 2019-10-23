import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Assigned } from '../models/assigned.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignedService {
  readonly rootUrl = "http://localhost:59786/api";

  constructor(private http: HttpClient) { }

  formData: Assigned;
  list: Assigned[];

  listmanagepostmentor() {
    this.http.get(this.rootUrl + '/assigneds/Getassigneds')
      .toPromise().then(res => this.list = res as Assigned[]);
  }
  getAllAssigned(): Observable<Assigned[]> {
    return this.http.get<Assigned[]>(this.rootUrl + '/assigneds/Getassigneds');
  }

  getCourseById(courseid: string): Observable<Assigned> {
    return this.http.get<Assigned>(this.rootUrl + '/assigneds/Getassigned/' + courseid);
  }
  getAssignedFollowMentor(mentorid: number): Observable<Assigned[]> {
    return this.http.get<Assigned[]>(this.rootUrl + '/assigneds/Getassignedsfollowmentor/' + mentorid);
  }
  getAssignedFollowTrainee(traineeid: number): Observable<Assigned[]> {
    return this.http.get<Assigned[]>(this.rootUrl + '/assigneds/Getassignedsfollowtrainee/' + traineeid);
  }

  putassigned(courseid: string, assigned: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootUrl + '/assigneds/Putassigned/' + courseid, assigned, httpOptions);
  }

  addAssign(course: any): Observable<any> {
    return this.http.post(this.rootUrl + '/assigneds/Postassigned', course, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // observe: 'response'
    });
  }
  deleteAssigned(mentorid: number, courseid: string): Observable<Assigned> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Assigned>(this.rootUrl + '/assigneds/Deleteassigned/' + courseid + '/'
      + mentorid, httpOptions);
    // api
  }
  deleteAssignById(courseid, mentorid): Observable<Assigned> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Assigned>(this.rootUrl + '/assigneds/Deleteassigned?courseid=' + courseid
      + '&mentorid=' + mentorid, httpOptions); // api
  }
  updateassign(assign: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootUrl + '/assigneds/Putassigned/' + assign.courseid, assign, httpOptions);
  }

}
