import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenWrite } from './listen-write';

describe('ListenWrite', () => {
  let component: ListenWrite;
  let fixture: ComponentFixture<ListenWrite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListenWrite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenWrite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
