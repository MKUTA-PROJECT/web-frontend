import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedstaffComponent } from './selectedstaff.component';

describe('SelectedstaffComponent', () => {
  let component: SelectedstaffComponent;
  let fixture: ComponentFixture<SelectedstaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedstaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
