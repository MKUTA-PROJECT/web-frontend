import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedprojectComponent } from './selectedproject.component';

describe('SelectedprojectComponent', () => {
  let component: SelectedprojectComponent;
  let fixture: ComponentFixture<SelectedprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
