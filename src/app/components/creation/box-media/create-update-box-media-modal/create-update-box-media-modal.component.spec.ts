import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBoxMediaModalComponent } from './create-update-box-media-modal.component';

describe('CreateUpdateBoxMediaModalComponent', () => {
  let component: CreateUpdateBoxMediaModalComponent;
  let fixture: ComponentFixture<CreateUpdateBoxMediaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateBoxMediaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateBoxMediaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
