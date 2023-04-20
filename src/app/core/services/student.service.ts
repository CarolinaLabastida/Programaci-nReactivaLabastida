import { Injectable } from '@angular/core';
import studentList from 'src/assets/json/students.json';
import { student } from '../models';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private count: number = 1;
  private studentName$ = new Subject<string>();
  private counter$ = new Subject<number>();

  constructor() {}

  //#region Promesas
  getAllStudents() {
    return new Promise<student[]>((resolve, reject) => {
      resolve(studentList);
      reject({ error: 'Ocurrio un error al obtener la información' });
    });
  }
  //#endregion

  //#region Observables
  showMessage(): Observable<string> {
    return this.studentName$.asObservable();
  }

  createMessage(text: string): void {
    this.studentName$.next(text);
  }

  getTotalStudents(): Observable<string> {
    return this.counter$.asObservable().pipe(
      map((num) => {
        return `Nuevos alumnos: ${num}`;
      })
    );
  }

  countStudent(): void {
    this.counter$.next(this.count++);
  }
  //#endregion
}
