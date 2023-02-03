import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerManagementComponent } from './officer-management.component';

describe('OfficerManagementComponent', () => {
  let component: OfficerManagementComponent;
  let fixture: ComponentFixture<OfficerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
