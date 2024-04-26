import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Student } from './model/student.interface';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  // trae todos los estudiantes
  list() {
    return this.http.get<Student[]>('http://localhost:8080/api/v1/student/')
  }

  // trae un estudiante por id
  get(id: number) {
    return this.http.get<Student>(`http://localhost:8080/api/v1/student/${id}`)
  }

  // crea un estudiante
  create(student: any) {
    return this.http.post<Student>('http://localhost:8080/api/v1/student/create', student)
  }

  // actualiza un estudiante
  update(id: number, student: Student) {
    return this.http.put<Student>(`http://localhost:8080/api/v1/student/update/${id}`, student)
  }

  // elimina un estudiante
  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/v1/student/delete/${id}`)
  }



}
