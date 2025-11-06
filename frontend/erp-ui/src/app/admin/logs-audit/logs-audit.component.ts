import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuditLog {
  id: number;
  timestamp: Date;
  userId: string;
  username: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE';
}

@Component({
  selector: 'app-logs-audit',
  templateUrl: './logs-audit.component.html',
  styleUrls: ['./logs-audit.component.css']
})
export class LogsAuditComponent implements OnInit {
  logs: AuditLog[] = [];
  filteredLogs: AuditLog[] = [];
  loading = true;
  
  // Filtres
  filterAction = '';
  filterUser = '';
  filterDateFrom = '';
  filterDateTo = '';
  filterStatus = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 20;
  totalPages = 1;

  actions = ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT'];
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    // Générer des logs de démonstration
    this.logs = this.generateDemoLogs();
    this.filteredLogs = [...this.logs];
    this.totalPages = Math.ceil(this.filteredLogs.length / this.itemsPerPage);
    this.loading = false;
  }

  generateDemoLogs(): AuditLog[] {
    const users = ['sahar_admin', 'sahar_chief', 'sahar_agent', 'sahar_citizen'];
    const actions = ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'VIEW'];
    const resources = ['User', 'Employee', 'Budget', 'Project', 'Claim', 'Report'];
    const statuses: ('SUCCESS' | 'FAILURE')[] = ['SUCCESS', 'FAILURE'];
    
    const logs: AuditLog[] = [];
    const now = new Date();
    
    for (let i = 0; i < 100; i++) {
      const date = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      const user = users[Math.floor(Math.random() * users.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const resource = resources[Math.floor(Math.random() * resources.length)];
      const status = Math.random() > 0.1 ? 'SUCCESS' : 'FAILURE';
      
      logs.push({
        id: i + 1,
        timestamp: date,
        userId: `user-${i}`,
        username: user,
        action: action,
        resource: resource,
        details: `${action} ${resource} - ${status}`,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        status: status
      });
    }
    
    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  applyFilters(): void {
    this.filteredLogs = this.logs.filter(log => {
      let match = true;
      
      if (this.filterAction && log.action !== this.filterAction) {
        match = false;
      }
      
      if (this.filterUser && !log.username.toLowerCase().includes(this.filterUser.toLowerCase())) {
        match = false;
      }
      
      if (this.filterStatus && log.status !== this.filterStatus) {
        match = false;
      }
      
      if (this.filterDateFrom) {
        const fromDate = new Date(this.filterDateFrom);
        if (log.timestamp < fromDate) {
          match = false;
        }
      }
      
      if (this.filterDateTo) {
        const toDate = new Date(this.filterDateTo);
        toDate.setHours(23, 59, 59);
        if (log.timestamp > toDate) {
          match = false;
        }
      }
      
      return match;
    });
    
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredLogs.length / this.itemsPerPage);
  }

  clearFilters(): void {
    this.filterAction = '';
    this.filterUser = '';
    this.filterDateFrom = '';
    this.filterDateTo = '';
    this.filterStatus = '';
    this.applyFilters();
  }

  getPaginatedLogs(): AuditLog[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLogs.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  exportLogs(): void {
    const csv = this.convertToCSV(this.filteredLogs);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(logs: AuditLog[]): string {
    const headers = ['ID', 'Timestamp', 'User', 'Action', 'Resource', 'Status', 'IP Address', 'Details'];
    const rows = logs.map(log => [
      log.id,
      log.timestamp.toISOString(),
      log.username,
      log.action,
      log.resource,
      log.status,
      log.ipAddress,
      log.details
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  getSuccessCount(): number {
    return this.filteredLogs.filter(log => log.status === 'SUCCESS').length;
  }

  getFailureCount(): number {
    return this.filteredLogs.filter(log => log.status === 'FAILURE').length;
  }

  getUniqueUsers(): number {
    const uniqueUsers = new Set(this.filteredLogs.map(log => log.username));
    return uniqueUsers.size;
  }
}
