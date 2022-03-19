import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureContentComponent } from './picture-content.component';

describe('PictureContentComponent', () => {
  let component: PictureContentComponent;
  let fixture: ComponentFixture<PictureContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
