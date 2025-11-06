package tn.tunis.erp.budget.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.budget.domain.Budget;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByYear(Integer year);
    List<Budget> findByDepartment(String department);
}
