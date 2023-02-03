import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserCollectionsModalComponent } from './create-user-collections-modal.component';

describe('CreateUserCollectionsModalComponent', () => {
  let component: CreateUserCollectionsModalComponent;
  let fixture: ComponentFixture<CreateUserCollectionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserCollectionsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserCollectionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
