import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Note } from '../model/Note.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private noteApiUrl = 'http://localhost:8080/notes/';
  private subject = new Subject<any>();

  public get autoRefresh() {
    return this.subject;
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json', token: localStorage.getItem("token") })

  };

  constructor(private http: HttpClient) { }

  createNote(noteDetail: Note): Observable<any> {
    return this.http.post(this.noteApiUrl + 'creation', noteDetail, { headers: new HttpHeaders({ 'token': localStorage.token }) }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  getRequestNote(url): Observable<any> {
    return this.http.get(this.noteApiUrl + url, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  getNote(url): Observable<any> {
    return this.http.get(this.noteApiUrl + url, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  trashNote(noteId: number, noteDetail: any) {
    return this.http.put(this.noteApiUrl + 'trash/' + noteId, noteDetail, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  deleteNotePermanently(noteId: number) {
    return this.http.delete(this.noteApiUrl + 'delete/' + noteId, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  addColor(url, value: any) {
    return this.http.put(this.noteApiUrl + url, value, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  archiveNote(noteId: number, noteDetail: any) {
    return this.http.put(this.noteApiUrl + 'archive/' + noteId, noteDetail, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  addReminder(url, reminder: any) {
    return this.http.post(this.noteApiUrl + url, reminder, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  removeReminder(noteId: number, noteDetail: any) {
    return this.http.put(this.noteApiUrl + 'removeReminder/' + noteId, noteDetail, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    }).pipe(tap(() => {
      this.subject.next();
    }));
  }

  updateNote(noteId: number, noteDetail: Note) {
    return this.http.put(this.noteApiUrl + 'update/' + noteId, noteDetail, { headers: new HttpHeaders({ 'token': localStorage.token }) }).pipe(tap(() => {
      this.subject.next();
    }));
  }
}
