import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonloggedlandingComponent } from './nonloggedlanding.component';

describe('NonloggedlandingComponent', () => {
  let component: NonloggedlandingComponent;
  let fixture: ComponentFixture<NonloggedlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonloggedlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonloggedlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
