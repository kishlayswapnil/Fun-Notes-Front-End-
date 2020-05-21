import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../model/Note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from '../service/note.service';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {
  notes = new Array<Note>();


  constructor(private router: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private noteService: NoteService) { }
  searchNotes: any;
  private param: any;

  ngOnInit(): void {
    this.noteService.autoRefresh.subscribe(() => {
      this.getOtherNotes();
    });
    this.router.queryParams.subscribe(params => {
      this.param = params['note'];
      this.getOtherNotes();
    });
  }
  getOtherNotes() {

    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:", response.object);
        this.notes = response['obj'];
        this.notes.map(note => this.notes.push(note));
      },
      (error: any) => {
        this.matSnackBar.open("Note was not fetched", "failed", { duration: 5000 })
      }
    );
  }
}
