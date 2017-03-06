/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsAddComponent } from './add.component';

describe('AddComponent', () => {
  let component: ItemsAddComponent;
  let fixture: ComponentFixture<ItemsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
