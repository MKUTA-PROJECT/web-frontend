import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubleadersComponent } from './clubleaders.component';

describe('ClubleadersComponent', () => {
  let component: ClubleadersComponent;
  let fixture: ComponentFixture<ClubleadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubleadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubleadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
