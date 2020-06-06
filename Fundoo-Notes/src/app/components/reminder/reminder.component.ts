import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/model/Note.model';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  @Input() note: Note;
  data: any[];
  datePipeString: string;
  displayReminder: string;

  constructor(private matSnackBar: MatSnackBar,
    private noteService: NoteService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getNotes();
    console.log("type of reminder:", typeof this.note.reminder);
    this.slice();
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

  slice() {
    var rem = this.note.reminder;
    var today = this.datePipeString;
    if (rem != null) {
      var res = rem.slice(0, -9);
    }
    else {
      res = null;
    }
    console.log("result:", res);
    console.log("this only:", today);

    const cal = new Date();
    cal.setDate(cal.getDate() + 1);
    var reminderDate = cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
    var tommorrowDate = this.datePipe.transform(reminderDate, 'yyyy-MM-dd');

    if (today == res) {
      this.displayReminder = "Today,8:00PM"

    }

    else if (tommorrowDate == res) {
      this.displayReminder = "Tommorrow,8:00AM"
    }

    else {
      this.displayReminder = rem;
    }

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
