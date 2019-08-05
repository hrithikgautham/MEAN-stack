import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./employee.service";
import { Employee } from './Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  employee: Employee;
  constructor(private employeeService: EmployeeService) {
    this.employee = this.employeeService.getEmployee();
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  setEmployee(newEmployee: Employee) {
    this.employeeService.setEmployee(newEmployee)
    .subscribe(resp => console.log("resp: ", resp));   
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = [...employees]
      console.log("employees: ", employees);
    });
    console.log("this.employees: ", this.employees);
  }

  setUpdate(employee: Employee) {
    this.employeeService.setLocalEmployee(employee);
  }
  updateEmployee(employee: Employee) {
    console.log("updaate resp: ", this.employeeService.updateEmployee(employee));
  }

  getIsUpdate(): boolean {
    return this.employeeService.getIsUpdate();
  }
}
