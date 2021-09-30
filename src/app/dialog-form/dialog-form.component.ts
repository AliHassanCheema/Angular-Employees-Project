import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatDialogRef
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.css']
})
export class DialogFormComponent implements OnInit {

  dialog: any;
  selectedRow: any;
  profileForm:FormGroup
  constructor(private dialogRef: MatDialogRef < DialogFormComponent > ) {
    this.profileForm = new FormGroup({
      id:new FormControl(),
      company: new FormControl(''),
      contact: new FormControl(''),
      country: new FormControl(''),
    });
  }
   

  ngOnInit(): void {
 
    this.profileForm.patchValue(this.selectedRow)
  }
  close() {
   this.dialogRef.close(null)
  
  }
  showdata() {
    // console.log(this.profileForm.value);
    this.dialogRef.close(this.profileForm.value)
  }
}
