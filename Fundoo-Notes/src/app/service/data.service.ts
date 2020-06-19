import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private broadcastNotes = new BehaviorSubject([]);
  broadcast = this.broadcastNotes.asObservable();
  private view = new Subject<any>();

  constructor(private noteService: NoteService) { }

  createBroadcast() {
    this.noteService.getRequestNote('getevery').subscribe(
      response => {
        this.broadcastNotes.next(response.body)
      }
    )
  }

  updateBroadcast() {
    this.noteService.getRequestNote('getevery').subscribe(
      response => {
        console.log("Display Notes", response);
        this.broadcastNotes.next(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  setView(data: any) {
    this.view.next({ view: data });
  }

  getView(): Observable<any> {
    return this.view.asObservable();
  }
}
