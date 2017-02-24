/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsLineComponent } from './line.component';

describe('ItemComponent', () => {
  let component: ItemsLineComponent;
  let fixture: ComponentFixture<ItemsLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsLineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
