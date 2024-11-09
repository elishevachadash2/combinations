import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCombinationsComponent } from './all-combinations.component';

describe('AllCombinationsComponent', () => {
  let component: AllCombinationsComponent;
  let fixture: ComponentFixture<AllCombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCombinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
