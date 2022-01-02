import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademylistComponent } from './academylist.component';

describe('AcademylistComponent', () => {
  let component: AcademylistComponent;
  let fixture: ComponentFixture<AcademylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
