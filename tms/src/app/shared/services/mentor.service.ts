import { Injectable } from '@angular/core';
import { Mentor } from '../models/mentor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Skill } from '../models/skill.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MentorService {
  formData: any;
  list: Mentor[];
  skillList: Skill[];
  public currentUser: Observable<Mentor>;
  readonly rootURL = 'http://localhost:59786/api';

  constructor(private http: HttpClient) { }
  // create mentor account
  postMentor(formData: Mentor) {
    return this.http.post(this.rootURL + '/mentors/Postmentor?Email=' + formData.email, formData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        // observe: 'response'
      });
  }
  addMentor(mentor: any): Observable<any> {
    return this.http.post<any>(this.rootURL + '/mentors/Postmentor?Email=' + mentor.email, mentor, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // observe: 'response'
    });
  }
  // get skill list
  getMentorSkill() {
    return this.http.get(this.rootURL + '/skills/Getskills').subscribe(result => {
      this.skillList = result as Skill[];
    });
  }

  // get mentor's information
  getMentorById(mentorid: number): Observable<Mentor> {
    return this.http.get<Mentor>(this.rootURL + '/mentors/Getmentor/' + mentorid);
  }
  // putMentor(mentorid: number, mentor: any): Observable<Mentor> {
  //   return this.http.put<Mentor>(this.rootURL + '/mentors1/' + mentorid, mentor);
  // }
  putMentor(mentorid: number, mentor: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootURL + '/mentors/Putmentor/' + mentorid, mentor, httpOptions);
  }
  // updatetmentor(mentor: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put(this.rootURL + '/-----/' + mentor.mentor, mentor, httpOptions);
  // }
  MentorAuthen(mentor: any) {
    return this.http.get(this.rootURL + '/mentors?Email=' + mentor.email + '&Password=' + mentor.password);
  }
  forgetmetor(formData: Mentor) {
    return this.http.post(this.rootURL + '/mentors/ForgotPassword?Email=' + formData.email, formData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      });
  }
  resetpasswordmentor(formData: Mentor) {
    return this.http.get(this.rootURL + '/mentors/ResetPassword?resetPasswordCode=' + formData.resetpasswordcode
      + '&Password=' + formData.password);
  }

  listmentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(this.rootURL + '/mentors/Getmentors');
  }
  deletementor(mentorid: number) {
    return this.http.delete(this.rootURL + '/mentors/Deletementor?id=' + mentorid);
  }

}
