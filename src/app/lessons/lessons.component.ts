import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Lesson, LessonService} from '../lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {

 @Output() editLesson = new EventEmitter<string>();
  displayedColumns = [
    'number', 'date', 'theme', 'homework', 'notes', 'edit'
  ];
  @ViewChild('lessonTable') lessonTable: MatTable<Lesson>;


  editRow(id: string): void {
    this.editLesson.emit(id);
  }

  constructor(private lessonService: LessonService) {
  }

  get lessons(): Lesson[] {
    return this.lessonService.lessons;
  }
}
