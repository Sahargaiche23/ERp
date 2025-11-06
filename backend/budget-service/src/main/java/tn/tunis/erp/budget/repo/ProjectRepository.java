package tn.tunis.erp.budget.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.budget.domain.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByDepartment(String department);
    List<Project> findByStatus(Project.ProjectStatus status);
}
