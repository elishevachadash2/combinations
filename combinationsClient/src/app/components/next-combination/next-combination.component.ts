import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Combination } from 'src/app/models/Combination';
import { CombinationsService } from 'src/app/services/combinations.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-next-combination',
  templateUrl: './next-combination.component.html',
  styleUrls: ['./next-combination.component.css']
})
export class NextCombinationComponent implements OnInit {

  currentCombination$: Observable<Combination | undefined> | undefined;
  hasNext$: Observable<boolean> | undefined;

  constructor(private combinationsService: CombinationsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.currentCombination$ = this.combinationsService.getCurrentCombination(); 
    this.hasNext$ = this.combinationsService.getHasNext(); 
  }

}

