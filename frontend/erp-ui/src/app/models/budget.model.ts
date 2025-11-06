export interface Budget {
  id: number;
  department: string;
  year: number;
  totalAllocated: number;
  totalSpent: number;
  remaining: number;
  status: 'DRAFT' | 'APPROVED' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetLine {
  id: number;
  budgetId: number;
  category: string;
  description: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  department: string;
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  status: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  progress: number;
  manager: string;
}

export interface Transaction {
  id: number;
  projectId?: number;
  budgetLineId?: number;
  date: Date;
  amount: number;
  type: 'EXPENSE' | 'REVENUE';
  category: string;
  description: string;
  reference: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
