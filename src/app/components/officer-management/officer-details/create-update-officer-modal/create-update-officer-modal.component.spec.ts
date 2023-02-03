import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateOfficerModalComponent } from './create-update-officer-modal.component';

describe('CreateUpdateOfficerModalComponent', () => {
  let component: CreateUpdateOfficerModalComponent;
  let fixture: ComponentFixture<CreateUpdateOfficerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateOfficerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateOfficerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
