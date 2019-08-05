import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Employee } from '../employee/Employee';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  @Input() employee: Employee;
  @Input() isUpdate: boolean;
  @Output() setEmployee = new EventEmitter();
  @Output() updateEmployee = new EventEmitter();
  checkoutForm;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("this.employee: ngnInit ", this.employee);
    this.checkoutForm = this.formBuilder.group({...this.employee});
  }

  onSubmit(newEmployee: Employee): void {
    console.log("newEmployee: ", newEmployee);
    if(!this.isUpdate)
      this.setEmployee.emit(newEmployee);
    else
      this.updateEmployee.emit(newEmployee);
    this.checkoutForm.reset();
  }

}
