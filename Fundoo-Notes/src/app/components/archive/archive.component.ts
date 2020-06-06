import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  @Input() note: any;
  data: any[];
  constructor(private matSnackBar: MatSnackBar,
    private noteService: NoteService, private dataService: DataService) {
    this.dataService.updateBroadcast();
  }

  ngOnInit(): void {
    this.dataService.broadcast.subscribe(
      (response: any) => {
        this.data = response['body']
        console.log("archive note", this.data)
      }

    )
  }
}
