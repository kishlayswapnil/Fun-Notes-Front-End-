import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private broadcastNotes = new BehaviorSubject([]);
  broadcast = this.broadcastNotes.asObservable();
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
}
