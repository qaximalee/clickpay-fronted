import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSubLocalityModalComponent } from './create-update-sub-locality-modal.component';

describe('CreateUpdateSubLocalityModalComponent', () => {
  let component: CreateUpdateSubLocalityModalComponent;
  let fixture: ComponentFixture<CreateUpdateSubLocalityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateSubLocalityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSubLocalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
