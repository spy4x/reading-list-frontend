import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item.model';


@Component({
  selector: 'rl-items-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsEditorComponent implements OnInit, OnChanges {

  readonly formDefaultValues: Item = {
    priority: 1,
    title: '',
    url: '',
    tags: []
  };
  @Input() item: Item;
  @Output() changed = new EventEmitter();
  @Output() cancel = new EventEmitter();
  form: FormGroup;

  constructor (private fb: FormBuilder) {

  }

  ngOnInit () {
    this.initForm();
  }

  ngOnChanges (changes: SimpleChanges): void {
    this.setNewFormValue(this.item);
  }

  initForm () {
    const formValues = this.item ? this.item : this.formDefaultValues;
    this.form = this.fb.group({
      'url': [formValues.url, Validators.required],
      'title': [formValues.title, Validators.required],
      'priority': [formValues.priority, Validators.required]
    });
  }

  setNewFormValue (newValue: Item) {
    if (!this.form || !newValue) {
      return;
    }
    this.form.setValue({
      url: newValue.url,
      title: newValue.title,
      priority: newValue.priority
    });
  }

  submitData (data: {title, url, priority, tags}): void {
    if (this.form.invalid) {
      return;
    }
    this.changed.emit(data);
    this.form.reset(this.formDefaultValues);
  }
}
