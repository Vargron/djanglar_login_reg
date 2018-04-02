import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedlandingComponent } from './loggedlanding.component';

describe('LoggedlandingComponent', () => {
  let component: LoggedlandingComponent;
  let fixture: ComponentFixture<LoggedlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
