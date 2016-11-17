import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item.model';


@Component({
  selector: 'rl-items-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class ItemsEditorComponent implements OnInit {
  readonly formDefaultValues: Item = new Item({priority: 1});
  @Input() item: Item;
  @Output() changed = new EventEmitter();
  @Output() cancel = new EventEmitter();
  form: FormGroup;

  constructor (private fb: FormBuilder) {

  }

  initForm () {
    let formValues = this.item ? this.item : this.formDefaultValues;
    this.form = this.fb.group({
      'url': [formValues.url, Validators.required],
      'priority': [formValues.priority, Validators.required],
      'tags': [formValues.tags, Validators.required]
    });
  }

  ngOnInit () {
    this.initForm();
  }

  submitData (data: {title, url, priority, tags}): void {
    if (this.form.invalid) {
      return;
    }
    this.changed.emit(data);
    this.form.reset(this.formDefaultValues);
  }
}
