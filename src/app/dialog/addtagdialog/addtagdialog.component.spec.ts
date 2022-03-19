import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTagdialogComponent } from './addtagdialog.component';

describe('AddTagdialogComponent', () => {
  let component: AddTagdialogComponent;
  let fixture: ComponentFixture<AddTagdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTagdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTagdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
