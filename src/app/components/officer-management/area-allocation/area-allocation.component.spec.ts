import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAllocationComponent } from './area-allocation.component';

describe('AreaAllocationComponent', () => {
  let component: AreaAllocationComponent;
  let fixture: ComponentFixture<AreaAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
