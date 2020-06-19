import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  data: any[];
  labels: any[];
  view: any;

  constructor(private dataService: DataService, private labelService: LabelService,
    private noteService: NoteService, private matSnackBar: MatSnackBar, private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.noteService.autoRefresh.subscribe(() => {
      this.getNotes();
    });
    this.getNotes();
    this.getView();
    this.getAllLabel();
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

  getView() {
    this.dataService.getView().subscribe(
      (response: any) => {
        this.view = response.view;
      }
    );
  }

  openDialog(note) {
    console.log("note updated data", note);
    const matDialogueReference = this.matDialog.open(UpdateComponent, {
      width: "600px",
      height: "auto",
      data: { note }
    });
    matDialogueReference.afterClosed().subscribe(result => {
      console.log("note updated");
    });
  }

  getAllLabel() {
    this.labelService.getAllLabel('getall').subscribe(
      response => {
        console.log(response)
        this.labels = response['body']
        console.log("info===label==", this.labels)
      },
      error => {
        console.log('Error', error);
      }
    )
  }

  remove(label: any) {
    this.labelService.removeLabel(label.id).subscribe(
      (response: any) => {
        console.log("response : ", response);
        this.matSnackBar.open("Deleted Successfully", "Ok", { duration: 4000 })
      }
    );
  }
}
