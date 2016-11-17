/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadTodayComponent } from './read-today.component';

describe('ReadTodayComponent', () => {
  let component: ReadTodayComponent;
  let fixture: ComponentFixture<ReadTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadTodayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
