import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseNumberComponent } from './components/choose-number/choose-number.component';
import { HttpClientModule } from '@angular/common/http';
import { TotalCombinationsComponent } from './components/total-combinations/total-combinations.component';
import { NextCombinationComponent } from './components/next-combination/next-combination.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageComponent } from './components/message/message.component';
import { DetailsCombinationsComponent } from './components/details-combinations/details-combinations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllCombinationsComponent } from './components/all-combinations/all-combinations.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    ChooseNumberComponent,
    TotalCombinationsComponent,
    NextCombinationComponent,
    MessageComponent,
    DetailsCombinationsComponent,
    AllCombinationsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatInputModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatIconModule,
    MatProgressBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
