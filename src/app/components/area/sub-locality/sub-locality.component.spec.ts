import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLocalityComponent } from './sub-locality.component';

describe('SubLocalityComponent', () => {
  let component: SubLocalityComponent;
  let fixture: ComponentFixture<SubLocalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubLocalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLocalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
