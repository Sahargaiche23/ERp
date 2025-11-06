package tn.tunis.erp.budget.controller;

import org.springframework.web.bind.annotation.*;
import tn.tunis.erp.budget.domain.Project;
import tn.tunis.erp.budget.repo.ProjectRepository;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {
    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Project> getAllProjects(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status) {
        
        if (department != null) {
            return projectRepository.findByDepartment(department);
        }
        if (status != null) {
            return projectRepository.findByStatus(Project.ProjectStatus.valueOf(status));
        }
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        existing.setName(project.getName());
        existing.setDescription(project.getDescription());
        existing.setDepartment(project.getDepartment());
        existing.setBudget(project.getBudget());
        existing.setSpent(project.getSpent());
        existing.setStartDate(project.getStartDate());
        existing.setEndDate(project.getEndDate());
        existing.setStatus(project.getStatus());
        existing.setProgress(project.getProgress());
        existing.setManager(project.getManager());
        
        return projectRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }
}
