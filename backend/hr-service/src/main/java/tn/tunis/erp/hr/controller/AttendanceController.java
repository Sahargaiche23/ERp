package tn.tunis.erp.hr.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import tn.tunis.erp.hr.domain.Attendance;
import tn.tunis.erp.hr.domain.Employee;
import tn.tunis.erp.hr.repo.AttendanceRepository;
import tn.tunis.erp.hr.repo.EmployeeRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendances")
@CrossOrigin(origins = "*")
public class AttendanceController {
    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceController(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    @GetMapping
    public List<Attendance> getAttendances(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long employeeId) {
        
        if (startDate != null && endDate != null) {
            if (employeeId != null) {
                return attendanceRepository.findByEmployeeIdAndDateBetween(employeeId, startDate, endDate);
            }
            return attendanceRepository.findByDateBetween(startDate, endDate);
        }
        return attendanceRepository.findAll();
    }

    @PostMapping
    public Attendance createAttendance(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @PostMapping("/check-in")
    public Attendance checkIn(@RequestBody Map<String, Long> payload) {
        Long employeeId = payload.get("employeeId");
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(LocalDate.now());
        attendance.setCheckIn(LocalDateTime.now());
        attendance.setStatus(Attendance.AttendanceStatus.PRESENT);
        
        return attendanceRepository.save(attendance);
    }

    @PostMapping("/{id}/check-out")
    public Attendance checkOut(@PathVariable Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        attendance.setCheckOut(LocalDateTime.now());
        
        if (attendance.getCheckIn() != null && attendance.getCheckOut() != null) {
            Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
            attendance.setHoursWorked(duration.toMinutes() / 60.0);
        }
        
        return attendanceRepository.save(attendance);
    }
}
