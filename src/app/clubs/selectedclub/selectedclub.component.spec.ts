import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedclubComponent } from './selectedclub.component';

describe('SelectedclubComponent', () => {
  let component: SelectedclubComponent;
  let fixture: ComponentFixture<SelectedclubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedclubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
