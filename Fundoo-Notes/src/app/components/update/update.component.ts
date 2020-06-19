import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/model/Note.model';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  noteModel: Note = new Note();
  note: any
  constructor(private matSnackBar: MatSnackBar, public matDialogRef: MatDialogRef<UpdateComponent>,
    private noteService: NoteService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.noteModel = this.data.note;
  }
  title = new FormControl();
  description = new FormControl();
  ngOnInit(): void {
  }
  onSubmit(data) {
    this.matDialogRef.close();
    this.noteModel.title = this.title.value,
      this.noteModel.description = this.description.value
    console.log("title", this.noteModel)
    this.noteService.updateNote(this.noteModel.id, this.noteModel).subscribe(
      (response: any) => {
        this.matSnackBar.open("note updated", "success", { duration: 5000 })
      },
      (error: any) => {
        this.matSnackBar.open("Note not updated", "failed", { duration: 3000 })
      }
    );
  }
}
