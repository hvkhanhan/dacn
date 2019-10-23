import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rootURL = "http://localhost:59786/api";
  constructor(
    private http: HttpClient,
  ) { }
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.rootURL + '/categories');
  }

  addcategory(category: Category): Observable<Category> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Category>(this.rootURL + '/categories', category, httpOptions);
  }

  updatecategory(category: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.rootURL + '/categories/Putcategory?id=' + category.categoryid, category, httpOptions);
  }
  deleteCategoryById(categoryid): Observable<Category> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Category>(this.rootURL + '/categories/Deletecategory?id=' + categoryid, httpOptions); //api
  }
}
