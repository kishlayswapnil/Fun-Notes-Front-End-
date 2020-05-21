import { Component, OnInit } from '@angular/core';
import { NoteService } from '../service/note.service';
import { Note } from '../model/Note.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {
  noteModel: Note = new Note();
  constructor(private noteService: NoteService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  open: boolean = false;

  openNote() {
    this.open = true;
  }
  onSubmit() {
    if (this.title.value && this.description.value != null) {
      this.noteModel.title = this.title.value;
      this.noteModel.description = this.description.value;
      this.noteService.createNote(this.noteModel).subscribe(

        (response: any) => {
          console.log(localStorage.getItem)
          this.matSnackBar.open("note created", "success", { duration: 5000 })
        },
        (error: any) => {
          this.matSnackBar.open("Notes not created", "failed", { duration: 3000 })
        }
      );
    }

    else {
      this.matSnackBar.open("Title and Description cannot be empty", "failed", { duration: 5000 })
    }
  }
}
