import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  data: any[];

  constructor(private matSnackBar: MatSnackBar,
    private noteService: NoteService) { }
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getRequestNote('getall').subscribe(
      response => {
        console.log(response)
        this.data = response['body']
        console.log("info=====", this.data)
      },
      error => {
        console.log('Error', error);
      }
    )
  }

  removeReminder(id: any) {
    this.noteService.removeReminder(id, null).subscribe(
      (response: any) => {
        console.log("response : ", response);
        this.matSnackBar.open("Reminder Removed", "Ok", { duration: 4000 })
      }
    )
  }
}

