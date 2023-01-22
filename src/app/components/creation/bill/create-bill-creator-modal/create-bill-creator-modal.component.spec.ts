import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillCreatorModalComponent } from './create-bill-creator-modal.component';

describe('CreateBillCreatorModalComponent', () => {
  let component: CreateBillCreatorModalComponent;
  let fixture: ComponentFixture<CreateBillCreatorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBillCreatorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillCreatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
