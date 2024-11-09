import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, scan, Subscription, tap, throwError } from 'rxjs';
import { BaseHTTPService } from './base-http.service'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Combination } from '../models/Combination';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';




@Injectable({
  providedIn: 'root'
})
export class CombinationsService extends BaseHTTPService {

  StartAPI = 'Combination/StartAPI?n=';
  GetNextAPI = 'Combination/GetNextAPI';
  GetAllAPI = 'Combination/GetAllAPI?pageSize=';
  GetAllPrevAPI = 'Combination/GetAllPrevAPI?pageSize=';
  GetPageAPI = 'Combination/GetPageinationAPI?pageNumber=';


  public pageSize = 2;

  private counterNext = new BehaviorSubject<number>(0);
  private pageNumber = new BehaviorSubject<number>(0);
  private totalCombinations = new BehaviorSubject<number>(0);
  private currentCombination = new BehaviorSubject<Combination | undefined>(undefined);
  private allCombinations = new BehaviorSubject<Combination[] | undefined>(undefined);
  private lastPageSize = new BehaviorSubject<number | undefined>(0);
  private hasSingleNext = new BehaviorSubject<boolean>(true);
  private hasAllNext = new BehaviorSubject<boolean>(true);
  private loading = new BehaviorSubject<boolean>(false);
  private isFirstCallGetAllAPI = new BehaviorSubject<boolean>(true);



  private subscriptionCounter: Subscription | undefined;



  constructor(protected override _http: HttpClient, private messageService: MessageService, private router: Router, errorHandlerService: ErrorHandlerService) {
    super(_http, errorHandlerService);

    //הרשמה לשינויים בעת לחיצה על Next
    this.subscriptionCounter = this.counterNext.pipe(
      tap(() => {
        this.totalCombinations.next(this.totalCombinations.value - 1);
      })
    ).subscribe();

  }


  startAPI(n: number) {
    this.get<string>(this.StartAPI + n)
      .subscribe({
        next: (data) => {
          this.totalCombinations.next(Number(data));
          this.router.navigate(['detailsCombinations/totalCombinations']);
        },
        error: (error) => {
        }
      });
  }



  getNextAPI() {
    this.get<Combination>(this.GetNextAPI)
      .subscribe({
        next: (data) => {
          if (data) {
            this.currentCombination.next(data);
            this.counterNext.next(this.counterNext.getValue() + 1)
            this.router.navigate(['detailsCombinations/nextCombination', data.combinationNumber]);
            this.hasSingleNext.next(true);
          }
          else {
            this.hasSingleNext.next(false);
          }
        },
        error: (error) => {
        }
      });
  }


  getAllAPI() {
    this.loading.next(true);
    if (this.isFirstCallGetAllAPI || this.currentCombination.getValue()?.hasNext) {
      this.get<Combination[]>(this.GetAllAPI + this.pageSize)
        .subscribe({
          next: (data) => {
            if (data) {
              this.updateCurrentCombination(data, 'nextAll');
              this.loading.next(false);
            }
          },
          error: (error) => {
          },
          complete: () => {
            this.isFirstCallGetAllAPI.next(false);
          }
        });
    }
  }


  getAllPrevAPI() {
    this.get<Combination[]>(this.GetAllPrevAPI + this.pageSize + '&lastpageSize=' + this.lastPageSize.getValue())
      .subscribe({
        next: (data) => {
          if (data) {
            this.updateCurrentCombination(data, 'prevAll');
          }
        },
        error: (error) => {
        }
      });
  }




  getPageByPagination() {
    this.loading.next(true);
    this.get<Combination[]>(this.GetPageAPI + this.pageNumber.getValue() + '&pageSize=' + this.pageSize + '&lastPageSize=' + this.lastPageSize.getValue())
      .subscribe({
        next: (data) => {
          this.updateCurrentCombination(data, 'Pagination');
        },
        error: (error) => {
        },
        complete: () => {
          this.loading.next(false);
        }
      });
  }




  updateCurrentCombination(data: Combination[], sourceReq: string) {
    let lastNonEmptyIndex = data.length - 1;
    while (lastNonEmptyIndex >= 0 && !data[lastNonEmptyIndex]) {
      lastNonEmptyIndex--;
    }

    if (lastNonEmptyIndex >= 0) {
      this.allCombinations.next(data);
      this.currentCombination.next(data[lastNonEmptyIndex]);
      this.lastPageSize.next(lastNonEmptyIndex + 1);
      this.hasAllNext.next(data[lastNonEmptyIndex].hasNext);
      if (sourceReq == 'nextAll') {
        this.pageNumber.next(this.pageNumber.getValue() + 1);
      }
      else if (sourceReq == 'prevAll') {
        this.pageNumber.next(this.pageNumber.getValue() - 1);
      }
    }
    else {
      this.hasAllNext.next(false);
    }
    this.router.navigate(['allCombinations', this.pageNumber.getValue()]);
  }


  public reset() {
    this.pageNumber.next(0);
    this.totalCombinations.next(0);
    this.currentCombination.next(undefined);
    this.allCombinations.next(undefined);
    this.hasSingleNext.next(true);
    this.lastPageSize.next(0);
    this.hasAllNext.next(true);
    this.counterNext.next(0);
    this.loading.next(false);
    this.isFirstCallGetAllAPI.next(true);

  }


  backToLastCombination() {
    this.router.navigate(['detailsCombinations/nextCombination', this.currentCombination.getValue()?.combinationNumber]);

  }


  changePageNumber(pageNumber: number) {
    this.pageNumber.next(pageNumber);
  }

  public getHasNext(): Observable<boolean> {
    return this.hasSingleNext.asObservable();
  }


  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }


  public getHasAllNext(): Observable<boolean> {
    return this.hasAllNext.asObservable();
  }


  public getAllCombinations(): Observable<Combination[] | undefined> {
    return this.allCombinations.asObservable();
  }


  public getTotalCombinations(): Observable<number> {
    return this.totalCombinations.asObservable();
  }

  public getCurrentCombination(): Observable<Combination | undefined> {
    return this.currentCombination.asObservable();
  }


  public getPageNumber(): Observable<number> {
    return this.pageNumber.asObservable();
  }


  ngOnDestroy() {
    if (this.subscriptionCounter) {
      this.subscriptionCounter.unsubscribe();
    }
  }

}


