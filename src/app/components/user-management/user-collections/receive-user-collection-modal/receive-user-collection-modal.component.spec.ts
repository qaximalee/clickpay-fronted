import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveUserCollectionModalComponent } from './receive-user-collection-modal.component';

describe('ReceiveUserCollectionModalComponent', () => {
  let component: ReceiveUserCollectionModalComponent;
  let fixture: ComponentFixture<ReceiveUserCollectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveUserCollectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveUserCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
