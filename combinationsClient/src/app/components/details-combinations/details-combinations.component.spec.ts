import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCombinationsComponent } from './details-combinations.component';

describe('DetailsCombinationsComponent', () => {
  let component: DetailsCombinationsComponent;
  let fixture: ComponentFixture<DetailsCombinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCombinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCombinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
