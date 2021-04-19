import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubformComponent } from './clubform.component';

describe('ClubformComponent', () => {
  let component: ClubformComponent;
  let fixture: ComponentFixture<ClubformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
