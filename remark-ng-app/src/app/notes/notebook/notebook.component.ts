import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notebook} from '../model/notebook';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {

  @Input() notebook: Notebook;
  @Output() notebookUpdated: EventEmitter<Notebook> = new EventEmitter<Notebook>();
  @Output() notebookDeleted: EventEmitter<Notebook> = new EventEmitter<Notebook>();

  constructor() { }

  ngOnInit() {
  }

  updateNotebook() {
    this.notebookUpdated.emit(this.notebook);
  }

  deleteNotebook() {
    this.notebookDeleted.emit(this.notebook);
  }
}
