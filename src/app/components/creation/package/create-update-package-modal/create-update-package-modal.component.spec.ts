import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePackageModalComponent } from './create-update-package-modal.component';

describe('CreateUpdatePackageModalComponent', () => {
  let component: CreateUpdatePackageModalComponent;
  let fixture: ComponentFixture<CreateUpdatePackageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePackageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePackageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
