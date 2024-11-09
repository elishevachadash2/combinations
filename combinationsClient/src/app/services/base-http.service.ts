import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { flatten } from '@angular/compiler';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class BaseHTTPService {

  baseUrl!: string;
  errorHandler: ErrorHandlerService | undefined;

  constructor(protected _http: HttpClient, protected errorHandlerService: ErrorHandlerService) {
    this.baseUrl = environment.apiUrl;
    this.errorHandler = errorHandlerService;
  }

 

  get<T>(url: string): Observable<T> {
    return this._http.get<T>(this.baseUrl + url, { withCredentials: false })
      .pipe(
        tap(() => {
        }),
        catchError(error => this.errorMgmt(error, this)),
        tap(() => {
        }),
      );
  }

  post<T>(url: string, data: object): Observable<T> {
    return this._http.post<T>(this.baseUrl + url, data, { withCredentials: false })
      .pipe(
        tap(() => {
        }),
        catchError(error => this.errorMgmt(error, this)),
        tap(() => {
        }),
      );
  }


  put<T>(url: string, data: object): Observable<T> {
    return this._http.put<T>(this.baseUrl + url, data, { withCredentials: false })
      .pipe(
        tap(() => {
        }),
        catchError(error => this.errorMgmt(error, this)),
        tap(() => {
        }),
      );
  }


  errorMgmt(error: HttpErrorResponse, $this: any) {
    this.errorHandler?.errorHandle(error);
    return throwError(error);
  }
}

