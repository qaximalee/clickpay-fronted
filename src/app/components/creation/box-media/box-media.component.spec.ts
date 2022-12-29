import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMediaComponent } from './box-media.component';

describe('BoxMediaComponent', () => {
  let component: BoxMediaComponent;
  let fixture: ComponentFixture<BoxMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
