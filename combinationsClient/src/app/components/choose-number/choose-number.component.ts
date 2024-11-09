import { Component, OnInit } from '@angular/core';
import { CombinationsService } from 'src/app/services/combinations.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-choose-number',
  templateUrl: './choose-number.component.html',
  styleUrls: ['./choose-number.component.css']
})
export class ChooseNumberComponent implements OnInit {
  number!:number;

  constructor(private combinationsService: CombinationsService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  async getSumCombinations(number: string) {
    if (number) {
     await this.combinationsService.startAPI(parseInt(number));
    }
    else {
      this.messageService.openDialogMessage('oops', 'you need enter a number')
    }
  }

}
