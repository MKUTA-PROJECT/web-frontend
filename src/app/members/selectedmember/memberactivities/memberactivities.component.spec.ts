import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberactivitiesComponent } from './memberactivities.component';

describe('MemberactivitiesComponent', () => {
  let component: MemberactivitiesComponent;
  let fixture: ComponentFixture<MemberactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
