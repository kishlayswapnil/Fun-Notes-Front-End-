import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../model/Note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from '../../service/note.service';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {
  notes = new Array<Note>();
  view: any;
  private param: any;

  constructor(private router: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private noteService: NoteService) { }


  ngOnInit(): void {
  }

  getView() {
    this.noteService.getView().subscribe(
      (response: any) => {
        this.view = response.view;
      }
    );

  }
}