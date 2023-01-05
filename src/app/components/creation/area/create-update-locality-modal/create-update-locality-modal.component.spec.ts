import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateLocalityModalComponent } from './create-update-locality-modal.component';

describe('CreateUpdateLocalityModalComponent', () => {
  let component: CreateUpdateLocalityModalComponent;
  let fixture: ComponentFixture<CreateUpdateLocalityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateLocalityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateLocalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
