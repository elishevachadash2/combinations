import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  title!:string;
  body!:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, body: string},public dialogRef: MatDialogRef<MessageComponent>) {
    this.title=data.title;
    this.body=data.body;
  }

  ngOnInit(): void {
  }

  closeDialog(){
   this.dialogRef.close();
  }

}
