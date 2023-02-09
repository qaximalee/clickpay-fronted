import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserCollectionModalComponent } from './detail-user-collection-modal.component';

describe('DetailUserCollectionModalComponent', () => {
  let component: DetailUserCollectionModalComponent;
  let fixture: ComponentFixture<DetailUserCollectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUserCollectionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUserCollectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
