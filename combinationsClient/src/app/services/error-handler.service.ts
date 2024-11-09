import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService  {

IsShown:boolean=false;

  private errorMsg = new BehaviorSubject<boolean>(false);
  hasError$ = this.errorMsg.asObservable();
  private afterClosedSubscription: Subscription | undefined;

  constructor(private _http: HttpClient, private dailogRef: MatDialog) {
  }
 
  errorHandle(error:any) {
     
    if(this.IsShown )  return;//אם מוצגת כבר הודעת שגיאה - צא
   
    let errorMessage = '';
     
    if (error.error instanceof ErrorEvent) {
       
      //  שגיאת צג לקוח
      errorMessage = error.message;
    } else {
      // שגיאת צד שרת
      if(error.status==0){
        errorMessage = "Invalid server";
      }
      else{
        if (error.status==500){
          errorMessage = error.error.pag;
        }
        else if (error.status == 401){
          errorMessage ="No permissions to perform the operation";
        }
        else{
          errorMessage = error.message;
        }
       
      }

    }
   
    this.IsShown=true;
 
    const ref=this.dailogRef.open(MessageComponent, {
        width: '450px',
        data: {
          title: error.status ? error.status : 'oops',
          body:errorMessage,
        }
      })
      this.afterClosedSubscription = ref.afterClosed().subscribe(res => {
        this.IsShown = false;
      });
  }

 

  ngOnDestroy() {
    if (this.afterClosedSubscription) {
      this.afterClosedSubscription.unsubscribe();
    }
  }

}


