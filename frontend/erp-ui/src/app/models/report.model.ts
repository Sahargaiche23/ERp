export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  onLeave: number;
  pendingLeaves: number;
  totalBudget: number;
  spentBudget: number;
  activeProjects: number;
  pendingClaims: number;
  resolvedClaims: number;
}

export interface ReportConfig {
  type: 'HR' | 'BUDGET' | 'CLAIMS' | 'PROJECTS' | 'FINANCIAL';
  period: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
  startDate?: Date;
  endDate?: Date;
  department?: string;
  format: 'PDF' | 'EXCEL' | 'CSV';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

export interface Report {
  id: number;
  name: string;
  type: string;
  generatedAt: Date;
  generatedBy: string;
  filePath?: string;
  parameters: any;
}
