import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerCollectionsComponent } from './officer-collections.component';

describe('OfficerCollectionsComponent', () => {
  let component: OfficerCollectionsComponent;
  let fixture: ComponentFixture<OfficerCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
