/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsReadTodayComponent } from './read-today.component';

describe('ItemsReadTodayComponent', () => {
  let component: ItemsReadTodayComponent;
  let fixture: ComponentFixture<ItemsReadTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsReadTodayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsReadTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
