export interface Employee {
  id: number;
  matricule: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  hireDate: Date;
  salary?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
}

export interface Leave {
  id: number;
  employeeId: number;
  employeeName: string;
  type: 'ANNUAL' | 'SICK' | 'UNPAID' | 'MATERNITY' | 'OTHER';
  startDate: Date;
  endDate: Date;
  days: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason?: string;
  approvedBy?: string;
  approvedAt?: Date;
}

export interface Attendance {
  id: number;
  employeeId: number;
  employeeName: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  hoursWorked?: number;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY';
  notes?: string;
}
