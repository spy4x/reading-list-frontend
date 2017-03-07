import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'rl-editor-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorHeaderComponent implements OnInit {

  @Input() doneDisabled: boolean;
  @Input() text: string;
  @Output() done = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor () {
  }

  ngOnInit () {
  }

}
