import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Student, StudentService} from '../student.service';
import {Lesson, LessonService} from '../lesson.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-student-marks',
  templateUrl: './student-marks.component.html',
  styleUrls: ['./student-marks.component.css']
})
export class StudentMarksComponent implements OnInit{
  @Output() editStudent = new EventEmitter<string>();
  marks = [1, 2, 3, 4, 5];
  marksForm: FormGroup;
  columns = [];
  columnsToDisplay = ['number', 'student', 'average', 'averageInt', 'edit'];
  constructor(
    public studentService: StudentService,
    private lessonService: LessonService,
    private build: FormBuilder
    ) { }
  @ViewChild('studentTable') studentTable: MatTable<Student>;

  initColumns(): void{
    this.columns = this.lessonService.lessons.map((item) => ({
      name: item.id,
      header: {
        date: item.date.toLocaleDateString(),
        theme: item.theme
      }
    }));
    this.columnsToDisplay = ['number', 'student', ...this.columns.map(i => i.name), 'average', 'averageInt', 'edit'];
  }

  initMarksForm(): void {
    const fromGroup = this.build.group({
      students: this.build.array(this.studentService.students.map(
        student => {
          return this.build.group({
            id: [student.id],
            name: [student.name],
            surname: [student.surname],
            patronymic: [student.patronymic],
            marks: this.build.group(this.lessonService.lessons.reduce(
              (acc , cur) => ({...acc, [cur.id]: [student.marks[cur.id]]}), {}
            )),
            average: [this.studentService.calculateAverage(student, 2)],
            weakAverage: [this.studentService.calculateAverage(student)]
          });
        }
    ))});
    console.log(fromGroup);
    this.marksForm = fromGroup;
  }

  get tableDS(): MatTableDataSource<any>{
    return new MatTableDataSource((this.marksForm.controls.students as FormArray).controls);
  }

saveStudent = (id) => {
    const student = this.marksForm.value.students.find((item) => item.id === id);
    if (student) {
      this.studentService.addStudent(student);
    }
  }

editRow(id: string): void {
    this.editStudent.emit(id);
  }

  ngOnInit(): void {
    this.initMarksForm();
    this.initColumns();
    this.lessonService.lessonUpdater.subscribe(() => {
      this.initMarksForm();
      this.initColumns();
    });
    this.studentService.studentUpdater.subscribe(() => {
      this.initMarksForm();
    });
  }
}
