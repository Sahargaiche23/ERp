import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Leave } from '../../models/employee.model';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})
export class LeavesComponent implements OnInit {
  leaves: Leave[] = [];
  filteredLeaves: Leave[] = [];
  loading = true;
  filterStatus = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves() {
    this.employeeService.getLeaves().subscribe({
      next: (data) => {
        this.leaves = data;
        this.filteredLeaves = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  filterLeaves() {
    if (this.filterStatus) {
      this.filteredLeaves = this.leaves.filter(l => l.status === this.filterStatus);
    } else {
      this.filteredLeaves = this.leaves;
    }
  }

  approveLeave(id: number) {
    this.employeeService.updateLeaveStatus(id, 'APPROVED').subscribe({
      next: () => {
        this.loadLeaves();
      }
    });
  }

  rejectLeave(id: number) {
    this.employeeService.updateLeaveStatus(id, 'REJECTED').subscribe({
      next: () => {
        this.loadLeaves();
      }
    });
  }
}
