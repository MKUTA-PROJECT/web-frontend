import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedmemberComponent } from './selectedmember.component';

describe('SelectedmemberComponent', () => {
  let component: SelectedmemberComponent;
  let fixture: ComponentFixture<SelectedmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
