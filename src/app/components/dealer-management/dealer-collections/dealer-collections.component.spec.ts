import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerCollectionsComponent } from './dealer-collections.component';

describe('DealerCollectionsComponent', () => {
  let component: DealerCollectionsComponent;
  let fixture: ComponentFixture<DealerCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
