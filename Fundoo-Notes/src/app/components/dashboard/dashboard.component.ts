import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, private matDialog: MatDialog,
    private labelService: LabelService) { }
  view: boolean = false;
  grid = "row";
  labels: any[];

  ngOnInit(): void {
    this.getAllLabel()
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
    this.dataService.setView(this.grid);
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

  openEditLabelDialog() {
    const dialogRef = this.matDialog.open(EditLabelComponent,
      {
        width: "300px",
        height: "Auto",
        data: this.labels,
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog closed");
    });
  }
}
