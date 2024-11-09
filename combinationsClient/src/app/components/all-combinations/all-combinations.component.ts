import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Combination } from 'src/app/models/Combination';
import { CombinationsService } from 'src/app/services/combinations.service';



@Component({
  selector: 'app-all-combinations',
  templateUrl: './all-combinations.component.html',
  styleUrls: ['./all-combinations.component.css']
})
export class AllCombinationsComponent implements OnInit {

  allNextCombinations$!: Observable<Combination[] | undefined>;
  hasAllNext$!: Observable<boolean | undefined>;
  totalCombinations$!: Observable<number>;
  loading$!: Observable<boolean>;
  numberPage$!: Observable<number>;
  pageSize: number | undefined;
  subscriptionPageNumber:Subscription | undefined;
  isChangedByPagination =false;

  constructor(private combinationsService: CombinationsService, private router: Router) { }

  ngOnInit(): void {

    this.loading$=this.combinationsService.getLoading();
    this.hasAllNext$=this.combinationsService.getHasAllNext();
    this.numberPage$ = this.combinationsService.getPageNumber();
    this.allNextCombinations$ = this.combinationsService.getAllCombinations();

  //הרשמה לשינויים numberPage
     this.subscriptionPageNumber=this.numberPage$.pipe(
      tap(pageNumber => {
        if (this.isChangedByPagination) {
          this.isChangedByPagination = false;
          this.combinationsService.getPageByPagination();
        }
      })
    ).subscribe();
    
    this.totalCombinations$ = this.combinationsService.getTotalCombinations();
    this.pageSize = this.combinationsService.pageSize;
  }


  getAllNextCombinations() {
    this.combinationsService.getAllAPI();
  }

  getAllPreviousCombinations() {
    this.combinationsService.getAllPrevAPI();
  }

  BackToLastCombination() {
    this.combinationsService.backToLastCombination();

  }

  getByPagination(page: number) {
    this.isChangedByPagination=true;
    this.combinationsService.changePageNumber(page);

  }


  ngOnDestroy() {
    if (this.subscriptionPageNumber) {
      this.subscriptionPageNumber.unsubscribe();
    }
  }

}





