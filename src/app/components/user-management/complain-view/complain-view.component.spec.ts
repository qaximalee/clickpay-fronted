import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainViewComponent } from './complain-view.component';

describe('ComplainViewComponent', () => {
  let component: ComplainViewComponent;
  let fixture: ComponentFixture<ComplainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
