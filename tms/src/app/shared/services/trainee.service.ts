import { Injectable } from '@angular/core';
import { Trainee } from '../models/trainee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  formData: any;
  list: Trainee[];

  readonly rootURL = "http://localhost:59786/api";

  constructor(private http: HttpClient) {
  }
  postTrainee(formData: Trainee) {
    return this.http.post(this.rootURL + '/trainees/Posttrainee?Email=' + formData.email, formData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      });
  }
  addTrainee(trainee: any): Observable<Trainee> {
    return this.http.post<Trainee>(this.rootURL + '/trainees/Posttrainee?Email=' + trainee.email, trainee, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // observe: 'response'
    });
  }
  getTraineeById(traineeid: number): Observable<any> {
    return this.http.get(this.rootURL + '/trainees/Gettrainee/' + traineeid);
  }
  putTrainee(traineeid: number, trainee: any): Observable<any> {
    return this.http.put(this.rootURL + '/trainees/Puttrainee/' + traineeid, trainee);
  }
  // forgot-password
  forgettrainee(formData: Trainee) {
    return this.http.post(this.rootURL + '/trainees/ForgotPassword?Email=' + formData.email, formData,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        observe: 'response'
      });
  }
  resetpasswordtrainee(formData: Trainee) {
    return this.http.get(this.rootURL + '/trainees/ResetPassword?resetPasswordCode=' + formData.resetpasswordcode
      + '&Password=' + formData.password);
  }
  listtrainee(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(this.rootURL + '/trainees/Gettraineesall');
  }

  addaccounttrainee(trainee: Trainee): Observable<Trainee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Trainee>(this.rootURL + '/trainees/Posttrainee', trainee, httpOptions);
  }

  updatettrainee(trainee: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootURL + '/trainees/Gettrainee/' + trainee.traineeid, trainee, httpOptions);
  }

  deletetrainee(traineeid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.rootURL + '/trainees/Deletetrainee/' + traineeid, httpOptions);
  }
}
