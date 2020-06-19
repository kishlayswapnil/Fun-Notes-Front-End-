import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/Model/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() note: any;
  reminderDate: string;
  datePipeString: string;
  tommorrowDate: string;
  setReminderDate: string;

  constructor(private noteService: NoteService, private matDialog: MatDialog,
    private matSnackBar: MatSnackBar, private dataService: DataService, private datePipe: DatePipe) {
    this.datePipeString = datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  ngOnInit() {

  }

  colorsList = [
    [
      {
        colorCode: "rgba(128, 0, 128,0.5)", name: "purple"
      },
      {
        colorCode: "rgba(0, 0, 228,0.5)", name: "Navy"
      },
      {
        colorCode: "rgba(0, 128, 0,0.5)", name: "Green"
      },
    ],
    [
      {
        colorCode: "rgba(255, 255,0.1)", name: "Yellow"
      },
      {
        colorCode: "rgba(128, 0, 0,0.4)", name: "Maroon"
      },
      {
        colorCode: "rgba(192, 192, 192,0.5)", name: "silver"
      }

    ], [

      {
        colorCode: "rgba(255, 255, 255,1)", name: "white"
      },
      {
        colorCode: "rgba(0, 255, 255,0.4)", name: "blue"
      },
      {
        colorCode: "rgba(255, 0, 0,0.5)", name: "Red"
      },

    ]
  ]

  deleteNote() {
    console.log("note:", this.note);
    console.log("note data:", this.note.id);
    this.noteService.trashNote(this.note.id, null).subscribe(
      (response: any) => {
        console.log("response : ", response.id);
        this.dataService.createBroadcast();
        this.matSnackBar.open("Trashed", "Ok", { duration: 4000 })
      }
    );
  }

  changeColor(color) {
    console.log(color.colorCode);
    this.noteService.addColor('color/' + this.note.id + "?color=" + color.colorCode, null).subscribe(
      response => {
        console.log("response : ", response);
        this.matSnackBar.open("Colour Changed", "ok", { duration: 4000 });
      }
    );
  }

  onArchive() {
    console.log("note:", this.note);
    console.log("note data:", this.note.id);
    this.noteService.archiveNote(this.note.id, null).subscribe(
      (response: any) => {
        console.log("response : ", response.id);
        this.dataService.createBroadcast();
        this.matSnackBar.open("Archived", "Ok", { duration: 4000 })
      }
    );
  }

  onUnArchive() {
    console.log("note:", this.note);
    console.log("note data:", this.note.id);
    this.noteService.archiveNote(this.note.id, null).subscribe(
      (response: any) => {
        console.log("response : ", response.id);
        this.dataService.createBroadcast();
        this.matSnackBar.open("UnArchived", "Ok", { duration: 4000 })
      }
    );
  }

  today(note) {
    let time: string = "8:00";
    this.reminderDate = this.datePipeString + "," + time + ":00";
    let newDate = new Date(this.reminderDate);
    console.log("Formated date:", newDate);
    let reminder = {
      reminder: newDate
    }
    this.noteService.addReminder('addReminder/' + this.note.id, reminder).subscribe(
      response => {
        console.log("response : ", response);
        this.matSnackBar.open("Reminder Added Successfully", "ok", { duration: 4000 });
      }
    );

  }

  tommorrow(note) {
    let time: string = "8:00";
    const cal = new Date();
    cal.setDate(cal.getDate() + 1);
    this.reminderDate = cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
    this.tommorrowDate = this.datePipe.transform(this.reminderDate, 'yyyy-MM-dd');
    console.log("tommorrow date:", this.tommorrowDate);
    this.setReminderDate = this.tommorrowDate + "," + time + ":00";

    console.log("set date:", this.setReminderDate);
    let newDate = new Date(this.setReminderDate);
    console.log("Formated date:", newDate);
    let reminder = {
      reminder: newDate
    }
    this.noteService.addReminder('addReminder/' + this.note.id, reminder).subscribe(
      response => {
        console.log("response : ", response);
        this.matSnackBar.open("Reminder Added Successfully", "ok", { duration: 4000 });
      }
    );
  }

  nextWeek(note) {
    let time: string = "8:00";
    const cal = new Date();
    cal.setDate(cal.getDate() + (1 + 7 - cal.getDay()) % 7);

    this.reminderDate = cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
    console.log("next week monday:", this.reminderDate);

    this.setReminderDate = this.reminderDate + "," + time + ":00";
    console.log("set date:", this.setReminderDate);
    let newDate = new Date(this.setReminderDate);
    console.log("Formated date:", newDate);
    let reminder = {
      reminder: newDate
    }
    this.noteService.addReminder('addReminder/' + this.note.id, reminder).subscribe(
      response => {
        console.log("response : ", response);
        this.matSnackBar.open("Reminder Added Successfully", "ok", { duration: 4000 });
      }
    );
  }

  addLabel(note): void {
    const dialogRef = this.matDialog.open(LabelComponent, {
      width: '250px', height: 'auto',
      data: { note }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('matdialog closed');
    });
  }
}


