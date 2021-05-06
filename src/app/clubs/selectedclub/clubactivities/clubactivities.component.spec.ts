import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubactivitiesComponent } from './clubactivities.component';

describe('ClubactivitiesComponent', () => {
  let component: ClubactivitiesComponent;
  let fixture: ComponentFixture<ClubactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
