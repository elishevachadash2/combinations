import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCombinationComponent } from './next-combination.component';

describe('NextCombinationComponent', () => {
  let component: NextCombinationComponent;
  let fixture: ComponentFixture<NextCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextCombinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
