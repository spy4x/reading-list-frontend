/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsLineComponent } from './line.component';

describe('TagsLineComponent', () => {
  let component: TagsLineComponent;
  let fixture: ComponentFixture<TagsLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagsLineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
