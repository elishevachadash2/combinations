import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CombinationsService } from 'src/app/services/combinations.service';

@Component({
  selector: 'app-total-combinations',
  templateUrl: './total-combinations.component.html',
  styleUrls: ['./total-combinations.component.css']
})
export class TotalCombinationsComponent implements OnInit {

  totalCombinations$!: Observable<number>;

  constructor(private combinationsService: CombinationsService, private router: Router) { }

  ngOnInit(): void {
    this.totalCombinations$ = this.combinationsService.getTotalCombinations();
  }

}
