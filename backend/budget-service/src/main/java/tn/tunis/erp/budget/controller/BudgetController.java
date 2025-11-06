package tn.tunis.erp.budget.controller;

import org.springframework.web.bind.annotation.*;
import tn.tunis.erp.budget.domain.Budget;
import tn.tunis.erp.budget.repo.BudgetRepository;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*")
public class BudgetController {
    private final BudgetRepository budgetRepository;

    public BudgetController(BudgetRepository budgetRepository) {
        this.budgetRepository = budgetRepository;
    }

    @GetMapping
    public List<Budget> getAllBudgets(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String department) {
        
        if (year != null) {
            return budgetRepository.findByYear(year);
        }
        if (department != null) {
            return budgetRepository.findByDepartment(department);
        }
        return budgetRepository.findAll();
    }

    @GetMapping("/{id}")
    public Budget getBudget(@PathVariable Long id) {
        return budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
    }

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetRepository.save(budget);
    }

    @PutMapping("/{id}")
    public Budget updateBudget(@PathVariable Long id, @RequestBody Budget budget) {
        Budget existing = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
        
        existing.setDepartment(budget.getDepartment());
        existing.setYear(budget.getYear());
        existing.setTotalAllocated(budget.getTotalAllocated());
        existing.setStatus(budget.getStatus());
        
        return budgetRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetRepository.deleteById(id);
    }
}
