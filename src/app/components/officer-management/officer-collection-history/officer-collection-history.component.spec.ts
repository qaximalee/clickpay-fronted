import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerCollectionHistoryComponent } from './officer-collection-history.component';

describe('OfficerCollectionHistoryComponent', () => {
  let component: OfficerCollectionHistoryComponent;
  let fixture: ComponentFixture<OfficerCollectionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerCollectionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerCollectionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
