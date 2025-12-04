import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillInBlank } from './fill-in-blank';

describe('FillInBlank', () => {
  let component: FillInBlank;
  let fixture: ComponentFixture<FillInBlank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillInBlank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillInBlank);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
