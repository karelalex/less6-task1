import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {Lesson, Student} from '../app.component';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css']
})
export class StudentMarksComponent implements OnChanges {
  @Input() lessons: Lesson[];
  @Input() students: Student[];
  @Output() editStudent = new EventEmitter<string>();
  @Output() changedStudentList = new EventEmitter<Student[]>();
  tableStudents: Student[];
  columns = [];
  columnsToDisplay = [];
  marks = [1, 2, 3, 4, 5];
  constructor() { }
  @ViewChild('studentTable') studentTable: MatTable<Student>;
  ngOnChanges(): void {
    if (!this.lessons) { return; }
    this.columns = this.lessons.map((item) => ({
      name: item.id,
      header: {
        date: item.date.toLocaleDateString(),
        theme: item.theme
      }
    }));
    this.columnsToDisplay = ['number', 'student', ...this.columns.map(i => i.name), 'average', 'averageInt', 'edit'];
    if (this.students) { this.tableStudents = [...this.students]; }
    if (this.studentTable) {this.studentTable.renderRows(); }
  }
  formatName = (student: Student): string => [student.surname, student.name, student.patronymic].filter(Boolean).join(' ');

  calculateAverage = (student: Student, accuracy = 0) => {
    const marks = Object.values(student.marks).filter((value => typeof value === 'number'));
    if (!marks.length) { return 0; }
    const averageMark = marks.reduce(((previousValue, currentValue) => previousValue + currentValue), 0) / marks.length;
    const multi = 10 ** accuracy;
    return Math.round(averageMark * multi) / multi;
  }

  saveStudentList = () => {
    localStorage.setItem('studentList', JSON.stringify(this.tableStudents.sort((a, b) => {
      return (this.formatName(a).localeCompare(this.formatName(b)));
    })));
    this.changedStudentList.emit(this.tableStudents);
  }

  editRow(id: string): void {
    this.editStudent.emit(id);
  }
}
