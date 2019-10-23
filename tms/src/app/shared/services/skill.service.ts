import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  readonly rootUrl = "http://localhost:59786/api";

  constructor(private http: HttpClient) { }


  getAllSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.rootUrl + '/skills/Getskills');
  }

  addskill(skill: Skill): Observable<Skill> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Skill>(this.rootUrl + '/skills', skill, httpOptions);
  }

  updateskill(skill: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootUrl + '/skills/Putskill?id=' + skill.idskill, skill, httpOptions);
  }

  deleteSkillById(idskill): Observable<Skill> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Skill>(this.rootUrl + '/skills/Deleteskill?id=' + idskill, httpOptions); //api
  }
}
