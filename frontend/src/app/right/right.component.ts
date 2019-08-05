import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee/Employee';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  @Input() employees: Employee[];
  @Output() update = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }

  updateEmployee(employee: Employee): void {
    this.update.emit(employee);
    console.log("cliked");
  }

}
