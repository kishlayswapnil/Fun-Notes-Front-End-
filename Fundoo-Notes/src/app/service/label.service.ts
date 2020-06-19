import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Label } from '../model/label.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private noteApiUrl = 'http://localhost:8080/notes/';
  private labelApiUrl = 'http://localhost:8080/labels/';

  private subject = new Subject<any>();

  public get autoRefresh() {
    return this.subject;
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json', token: localStorage.getItem("token") })

  };

  constructor(private http: HttpClient) { }

  createLabel(reminder: Label) {
    return this.http.post(this.labelApiUrl + 'create', reminder, { headers: new HttpHeaders({ 'token': localStorage.token }) }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  addLabel(noteId: number, reminder: Label): Observable<any> {
    return this.http.post(this.noteApiUrl + 'labels/' + noteId, reminder, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }


  getAllLabel(url): Observable<any> {
    return this.http.get(this.labelApiUrl + url, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  removeLabel(noteId: number) {
    return this.http.delete(this.labelApiUrl + 'delete/' + noteId, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  deleteLabel(noteId: number) {
    return this.http.delete(this.labelApiUrl + 'delete/' + noteId, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }
}
