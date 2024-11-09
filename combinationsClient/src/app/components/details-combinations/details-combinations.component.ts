import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { async, Observable, Subscription, tap } from 'rxjs';
import { Combination } from 'src/app/models/Combination';
import { CombinationsService } from 'src/app/services/combinations.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-details-combinations',
  templateUrl: './details-combinations.component.html',
  styleUrls: ['./details-combinations.component.css']
})
export class DetailsCombinationsComponent implements OnInit {

  currentCombination$!: Observable<Combination | undefined>
  hasNext$!: Observable<boolean>;
  pageNumber$!: Observable<number>;
  loading$!: Observable<boolean>;
  isFirstCall = true;

  constructor(private combinationsService: CombinationsService, private router: Router, private messageService: MessageService) { }


  ngOnInit(): void {
    this.loading$=this.combinationsService.getLoading();
    this.hasNext$ = this.combinationsService.getHasNext();
    this.currentCombination$ = this.combinationsService.getCurrentCombination();
    this.pageNumber$ = this.combinationsService.getPageNumber();
  }


  reset() {
    this.combinationsService.reset();
    this.router.navigateByUrl('/chooseNumber');
  }


  nextCombination() {
    this.combinationsService.getNextAPI();
  }

  allCombinations() {
    this.combinationsService.getAllAPI();
  }


}
