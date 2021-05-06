import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubdetailsComponent } from './clubdetails.component';

describe('ClubdetailsComponent', () => {
  let component: ClubdetailsComponent;
  let fixture: ComponentFixture<ClubdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
