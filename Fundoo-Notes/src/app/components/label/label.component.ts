import { Component, OnInit, Inject } from '@angular/core';
import { LabelService } from 'src/app/service/label.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Label } from 'src/app/model/label.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  noteId: number;
  labels: Label[];
  label: Label = new Label();

  constructor(private matSnackBar: MatSnackBar, public matDialogRef: MatDialogRef<LabelComponent>,
    private labelService: LabelService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.noteId = data.note.id;
  }

  ngOnInit(): void {
  }

  /*createLabel(input) {
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
        this.addLabel(this.label.id);

      }
    );

  }*/

  addLabel(input) {
    this.matDialogRef.close();
    this.label.name = input;
    this.labelService.addLabel(this.noteId, this.label).subscribe(
      (response: any) => {
        console.log("input:", input);
        console.log("response:", response);
        this.matSnackBar.open("Label added", "Ok", { duration: 3000 });
      }
    );
  }
}
