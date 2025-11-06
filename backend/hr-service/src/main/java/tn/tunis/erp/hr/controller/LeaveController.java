package tn.tunis.erp.hr.controller;

import org.springframework.web.bind.annotation.*;
import tn.tunis.erp.hr.domain.Leave;
import tn.tunis.erp.hr.repo.LeaveRepository;
import tn.tunis.erp.hr.repo.EmployeeRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {
    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveController(LeaveRepository leaveRepository, EmployeeRepository employeeRepository) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping
    public List<Leave> getAllLeaves(@RequestParam(required = false) Long employeeId) {
        if (employeeId != null) {
            return leaveRepository.findByEmployeeId(employeeId);
        }
        return leaveRepository.findAll();
    }

    @GetMapping("/{id}")
    public Leave getLeave(@PathVariable Long id) {
        return leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
    }

    @PostMapping
    public Leave createLeave(@RequestBody Leave leave) {
        return leaveRepository.save(leave);
    }

    @PatchMapping("/{id}/status")
    public Leave updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
        
        leave.setStatus(Leave.LeaveStatus.valueOf(payload.get("status")));
        if (leave.getStatus() == Leave.LeaveStatus.APPROVED) {
            leave.setApprovedAt(LocalDateTime.now());
            leave.setApprovedBy(payload.getOrDefault("approvedBy", "admin"));
        }
        
        return leaveRepository.save(leave);
    }

    @DeleteMapping("/{id}")
    public void deleteLeave(@PathVariable Long id) {
        leaveRepository.deleteById(id);
    }
}
