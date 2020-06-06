import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/model/Note.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  @Input() note: any;
  data: any[];
  datas: any

  constructor(private matSnackBar: MatSnackBar,
    private noteService: NoteService, private dataService: DataService) {
    this.dataService.updateBroadcast();
  }
  ngOnInit() {
    this.dataService.broadcast.subscribe(
      (response: any) => {
        this.data = response['body']
        console.log("trash note", this.data)
      }

    )
  }

  onDelete(id: any) {
    console.log("note data:", id);
    this.noteService.deleteNotePermanently(id).subscribe(
      (response: any) => {
        console.log("response : ", response.id);
        this.matSnackBar.open("Restored", "Ok", { duration: 4000 })
      }
    );
  }

  onRestore(id: any) {
    console.log("note data:", id);
    this.datas = {
      trashed: false
    }
    this.noteService.trashNote(id, null).subscribe(
      (response: any) => {
        console.log("response : ", response.id);
        this.matSnackBar.open("Restored", "Ok", { duration: 4000 })
      }
    );
  }
}
