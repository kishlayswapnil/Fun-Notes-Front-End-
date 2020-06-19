import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  label: Label = new Label();
  labels: any[];
  constructor(public matDialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private labelService: LabelService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllLabel;
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

  createLabel(input) {
    this.matDialogRef.close();
    this.label.name = input;
    //console.log("input:");
    console.log("input label:", this.label);
    this.labelService.createLabel(this.label).subscribe(
      (response: any) => {
        console.log("input:", input);
        console.log("response:", response);
        this.label = response;
        console.log("new label:", this.label.id);
        this.matSnackBar.open("Label Created", "Ok", { duration: 2000 });
      }
    );
  }

  deleteLabel(label: any) {
    this.labelService.deleteLabel(label.id).subscribe(
      (response: any) => {
        this.matSnackBar.open("Label Deleted", "ok", { duration: 4000 });
      },
      (error: any) => {
        this.matSnackBar.open("Label Not Deleted", "failed", { duration: 5000 });
      }
    );
  }
}
