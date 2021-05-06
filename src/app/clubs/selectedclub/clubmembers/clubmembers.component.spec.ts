import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubmembersComponent } from './clubmembers.component';

describe('ClubmembersComponent', () => {
  let component: ClubmembersComponent;
  let fixture: ComponentFixture<ClubmembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubmembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
