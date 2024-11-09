import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private matDialog: MatDialog) { }

  openDialogMessage(title: string, body: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: title,
      body: body
    };
    dialogConfig.height = '250px';
    dialogConfig.width = '450px';

    this.matDialog.open(MessageComponent, dialogConfig);
  }

}
