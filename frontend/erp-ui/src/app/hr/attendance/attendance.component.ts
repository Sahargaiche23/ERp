import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Attendance } from '../../models/employee.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendances: Attendance[] = [];
  loading = true;
  selectedDate = new Date();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadAttendances();
  }

  loadAttendances() {
    const startDate = new Date(this.selectedDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(this.selectedDate);
    endDate.setHours(23, 59, 59, 999);

    this.employeeService.getAttendances(startDate, endDate).subscribe({
      next: (data) => {
        this.attendances = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onDateChange() {
    this.loadAttendances();
  }
}
