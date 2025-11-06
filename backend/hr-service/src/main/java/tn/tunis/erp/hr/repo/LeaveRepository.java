package tn.tunis.erp.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.hr.domain.Leave;

import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployeeId(Long employeeId);
    List<Leave> findByStatus(Leave.LeaveStatus status);
}
