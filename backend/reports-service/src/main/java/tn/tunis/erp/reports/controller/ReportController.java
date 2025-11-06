package tn.tunis.erp.reports.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @GetMapping("/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Mock data - in production, these would be fetched from respective services
        stats.put("totalEmployees", 150);
        stats.put("activeEmployees", 145);
        stats.put("onLeave", 5);
        stats.put("pendingLeaves", 12);
        stats.put("totalBudget", 5000000.0);
        stats.put("spentBudget", 3200000.0);
        stats.put("activeProjects", 8);
        stats.put("pendingClaims", 23);
        stats.put("resolvedClaims", 156);
        
        return stats;
    }

    @GetMapping("/hr")
    public Map<String, Object> getHRReport(@RequestParam String period) {
        Map<String, Object> report = new HashMap<>();
        report.put("period", period);
        report.put("totalEmployees", 150);
        report.put("newHires", 5);
        report.put("terminations", 2);
        report.put("averageAttendance", 95.5);
        report.put("leavesApproved", 45);
        
        return report;
    }

    @GetMapping("/budget")
    public Map<String, Object> getBudgetReport(@RequestParam Integer year) {
        Map<String, Object> report = new HashMap<>();
        report.put("year", year);
        report.put("totalBudget", 5000000.0);
        report.put("spent", 3200000.0);
        report.put("remaining", 1800000.0);
        report.put("utilizationRate", 64.0);
        
        return report;
    }

    @GetMapping("/claims")
    public Map<String, Object> getClaimsReport(@RequestParam String period) {
        Map<String, Object> report = new HashMap<>();
        report.put("period", period);
        report.put("totalClaims", 179);
        report.put("resolved", 156);
        report.put("pending", 23);
        report.put("averageResolutionTime", 48.5);
        report.put("satisfactionRate", 87.5);
        
        return report;
    }

    @GetMapping("/projects")
    public Map<String, Object> getProjectsReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalProjects", 15);
        report.put("active", 8);
        report.put("completed", 5);
        report.put("onHold", 2);
        report.put("averageProgress", 67.3);
        
        return report;
    }
}
