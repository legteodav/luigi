import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLuigiDemoComponent } from './ng-luigi.component';

describe('NgLuigiComponent', () => {
  let component: NgLuigiDemoComponent;
  let fixture: ComponentFixture<NgLuigiDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgLuigiDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgLuigiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
