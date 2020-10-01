import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Student, StudentService} from '../student.service';
import {Lesson, LessonService} from '../lesson.service';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css']
})
export class StudentMarksComponent{
  @Output() editStudent = new EventEmitter<string>();
  @Output() changedStudentList = new EventEmitter<Student[]>();
  marks = [1, 2, 3, 4, 5];
  constructor(
    public studentService: StudentService,
    private lessonService: LessonService
    ) { }
  @ViewChild('studentTable') studentTable: MatTable<Student>;

  get columnsToDisplay(): string[] {
    return ['number', 'student', ...this.columns.map(i => i.name), 'average', 'averageInt', 'edit'];
  }

  get columns(): { name: string; header: { date: string; theme: string } }[] {
    return  this.lessonService.lessons.map((item) => ({
      name: item.id,
      header: {
        date: item.date.toLocaleDateString(),
        theme: item.theme
      }
    }));
  }

  get tableStudents(): Student[] {
    return [...this.studentService.students];
  }

  saveStudent = (id) => {
    const student = this.tableStudents.find((item) => item.id === id);
    if (student) {
      this.studentService.addStudent(student);
    }
  }

  editRow(id: string): void {
    this.editStudent.emit(id);
  }
}
