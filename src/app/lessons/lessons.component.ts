import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Lesson} from '../app.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnChanges {

 @Input() lessons: Lesson[];
 @Output() editLesson = new EventEmitter<string>();
  displayedColumns = [
    'number', 'date', 'theme', 'homework', 'notes', 'edit'
  ];
  @ViewChild('lessonTable') lessonTable: MatTable<Lesson>;
  ngOnChanges(): void {
      if (this.lessonTable) {this.lessonTable.renderRows(); }
  }


  editRow(id: string): void {
    this.editLesson.emit(id);
  }
}
