package tn.tunis.erp.claims.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.tunis.erp.claims.domain.Claim;
import tn.tunis.erp.claims.repo.ClaimRepository;
import tn.tunis.erp.claims.service.ClaimService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    private final ClaimRepository repo;
    private final ClaimService claimService;

    public ClaimController(ClaimRepository repo, ClaimService claimService) {
        this.repo = repo;
        this.claimService = claimService;
    }

    @GetMapping
    public List<Claim> all(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priority) {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Claim> one(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Claim create(@RequestBody Claim c) { 
        c.setCreatedAt(LocalDateTime.now());
        c.setUpdatedAt(LocalDateTime.now());
        return repo.save(c); 
    }

    @PutMapping("/{id}")
    public ResponseEntity<Claim> update(@PathVariable UUID id, @RequestBody Claim c) {
        return repo.findById(id).map(existing -> {
            c.setId(id);
            c.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(repo.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Claim> updateStatus(@PathVariable UUID id, @RequestBody Map<String, String> payload) {
        return repo.findById(id).map(claim -> {
            claim.setStatus(Claim.ClaimStatus.valueOf(payload.get("status")));
            claim.setUpdatedAt(LocalDateTime.now());
            
            if (claim.getStatus() == Claim.ClaimStatus.RESOLVED) {
                claim.setResolvedAt(LocalDateTime.now());
                claim.setResolution(payload.get("resolution"));
            }
            
            return ResponseEntity.ok(repo.save(claim));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/assign")
    public ResponseEntity<Claim> assignClaim(@PathVariable UUID id, @RequestBody Map<String, String> payload) {
        return repo.findById(id).map(claim -> {
            claim.setAssignedTo(payload.get("assignedTo"));
            claim.setUpdatedAt(LocalDateTime.now());
            return ResponseEntity.ok(repo.save(claim));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return claimService.getStats();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (repo.existsById(id)) { repo.deleteById(id); return ResponseEntity.noContent().build(); }
        return ResponseEntity.notFound().build();
    }
}
