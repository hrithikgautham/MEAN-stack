import { Injectable } from '@angular/core';
import { Employee } from './Employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee: Employee;
  isUpdate: boolean = false;
  // employees: Employee[];
  getAllEmployeesURL: string = 'http://localhost:5000/emps';
  setEmployeeURL: string = 'http://localhost:5000/emps/add';
  constructor(private http: HttpClient) {
    this.employee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: ""
    }
  }
  // getEmployees(): Observable<Employee[]> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Origin': 'http://localhost:4200',
  //       'Access-Control-Request-Method': 'GET',
  //     })
  //   };
  //   this.http.options(this.getAllEmployeesURL, httpOptions);
  //   return this.http.get<Employee[]>(this.getAllEmployeesURL);
  // }
  // getEmployeeById(id: string): Observable<Employee> {
  //   const URL = this.getAllEmployeesURL + `/${id}`;
  //   return this.http.get<Employee>(URL);
  // }
  getEmployee(): Employee {
    return this.employee;
  }
  setEmployee(newEmployee: Employee): Observable<Employee> {
    this.isUpdate = false;
    return this.http.post<Employee>(this.setEmployeeURL, newEmployee);
  }
  setLocalEmployee(employee: Employee) {
    this.isUpdate = true;
    this.employee = employee;
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.getAllEmployeesURL);
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    const body = {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    };
    return this.http.post<Employee>(`${this.getAllEmployeesURL}/update/${employee._id}`, body);
  }
  getIsUpdate(): boolean {
    return this.isUpdate;
  }
}
