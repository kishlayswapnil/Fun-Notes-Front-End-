import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private noteService: NoteService) { }
  view: boolean = false;
  grid = "row";
  ngOnInit(): void {
  }
  onClick() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  getView() {
    if (this.view == true) {
      this.view = false;
      this.grid = "row";
    }
    else {
      this.view = true;
      this.grid = "column";
    }
    this.noteService.setView(this.grid);
    console.log(this.view);
  }

  onTrash() {
    this.router.navigate(['dashboard', 'trash']);
  }

  onArchive() {
    this.router.navigate(['dashboard', 'archive']);
  }
  onReminder() {
    this.router.navigate(['dashboard', 'reminder']);
  }
}
