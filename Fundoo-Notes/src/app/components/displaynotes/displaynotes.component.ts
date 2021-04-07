import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../model/Note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from '../../service/note.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {


  constructor(
    private noteService: NoteService) { }


  ngOnInit(): void {
  }

}