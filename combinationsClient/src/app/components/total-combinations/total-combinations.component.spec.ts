import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCombinationsComponent } from './total-combinations.component';

describe('TotalCombinationsComponent', () => {
  let component: TotalCombinationsComponent;
  let fixture: ComponentFixture<TotalCombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCombinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
