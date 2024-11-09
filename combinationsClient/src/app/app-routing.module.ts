import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChooseNumberComponent } from './components/choose-number/choose-number.component';
import { TotalCombinationsComponent } from './components/total-combinations/total-combinations.component';
import { NextCombinationComponent } from './components/next-combination/next-combination.component';
import { DetailsCombinationsComponent } from './components/details-combinations/details-combinations.component';
import { AllCombinationsComponent } from './components/all-combinations/all-combinations.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'chooseNumber', pathMatch: 'full' },
  { path: 'chooseNumber', component: ChooseNumberComponent },
  { path: 'allCombinations/:numPage', component: AllCombinationsComponent },
  {
    path: 'detailsCombinations',
    component: DetailsCombinationsComponent,
    children: [
      { path: 'totalCombinations', component: TotalCombinationsComponent },
      { path: 'nextCombination/:index', component: NextCombinationComponent }
    ]
  },
   { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
