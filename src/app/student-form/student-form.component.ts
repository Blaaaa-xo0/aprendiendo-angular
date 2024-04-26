import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../model/student.interface';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ RouterModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export default class StudentFormComponent implements OnInit{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  form?: FormGroup;
  student?: Student;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.studentService.get(parseInt(id))
        .subscribe(student => {
          this.student = student;
          this.form = this.fb.group({
            name: [student.name, [Validators.required]],
            email: [student.email, [Validators.required, Validators.email]],
            dob: [student.dob, [Validators.required]],
          })
        });
    }else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', [Validators.required]],
      })
    }

  }

  save() {
    const studentForm = this.form!.value;

    if(this.student) {
      this.studentService.update(this.student.id, studentForm)
        .subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.studentService.create(studentForm)
        .subscribe(() => {
        this.router.navigate(['/']);
      });
    }


  }
}
