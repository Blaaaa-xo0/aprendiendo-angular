import { Component, OnInit, inject } from '@angular/core';
import { StudentService } from '../student.service';
import { RouterModule } from '@angular/router';
import { Student } from '../model/student.interface';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export default class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);

  students: Student[] = [];

  ngOnInit(): void {
    this.studentService.list()
      .subscribe((students) => {
        this.students = students;
      })
  }
}
