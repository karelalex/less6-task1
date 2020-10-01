import {Component, ViewChild} from '@angular/core';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'less4-task1';
  @ViewChild('Tabs') tabs: MatTabGroup;
  tabIndex: number;
  editingLessonId: string;
  editingStudentId: string;


  constructor( ) {
  }

  onFinishLessonEditing(): void {
    this.tabIndex = 0;
  }

  onStartEditLesson(id: string): void {
    this.editingLessonId = id;
    this.tabIndex = 2;
  }

  onStartEditingStudent(id: string): void {
    this.editingStudentId = id;
    this.tabIndex = 3;
  }

  onFinishStudentEditing(): void {
    this.tabIndex = 1;
  }
}
