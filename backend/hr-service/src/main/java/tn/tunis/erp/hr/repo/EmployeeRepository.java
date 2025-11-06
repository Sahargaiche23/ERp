package tn.tunis.erp.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.hr.domain.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
