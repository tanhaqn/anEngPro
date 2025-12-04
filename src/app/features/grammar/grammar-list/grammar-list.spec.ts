import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarList } from './grammar-list';

describe('GrammarList', () => {
  let component: GrammarList;
  let fixture: ComponentFixture<GrammarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrammarList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrammarList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
