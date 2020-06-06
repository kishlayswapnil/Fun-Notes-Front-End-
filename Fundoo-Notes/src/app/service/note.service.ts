import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Note } from '../model/Note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private noteApiUrl = 'http://localhost:8080/notes/';

  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json', token: localStorage.getItem("token") })

  };
  private view = new Subject<any>();



  constructor(private http: HttpClient) { }

  createNote(noteDetail: Note): Observable<any> {
    return this.http.post(this.noteApiUrl + 'creation', noteDetail, { headers: new HttpHeaders({ 'token': localStorage.token }) });
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

  setView(data: any) {
    this.view.next({ view: data });
  }

  getView(): Observable<any> {
    return this.view.asObservable();
  }

  trashNote(noteId: number, noteDetail: any) {
    return this.http.put(this.noteApiUrl + 'trash/' + noteId, noteDetail, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  deleteNotePermanently(noteId: number) {
    return this.http.delete(this.noteApiUrl + 'delete/' + noteId, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  addColor(url, value: any) {
    return this.http.put(this.noteApiUrl + url, value, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  archiveNote(noteId: number, noteDetail: any) {
    return this.http.put(this.noteApiUrl + 'trash/' + noteId, noteDetail, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

  addReminder(url, reminder: any) {
    return this.http.post(this.noteApiUrl + url, reminder, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }


  removeReminder(noteId: number, noteDetail: any) {
    return this.http.put(this.noteApiUrl + 'removeReminder/' + noteId, noteDetail, {
      headers: new HttpHeaders().set("jwt_token", localStorage.getItem("token")),
      observe: 'response'
    });
  }

}
