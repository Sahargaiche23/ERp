package tn.tunis.erp.claims.service;

import org.springframework.stereotype.Service;
import tn.tunis.erp.claims.domain.Claim;
import tn.tunis.erp.claims.repo.ClaimRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClaimService {
    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    public Map<String, Object> getStats() {
        List<Claim> allClaims = claimRepository.findAll();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", allClaims.size());
        stats.put("new", allClaims.stream().filter(c -> c.getStatus() == Claim.ClaimStatus.NEW).count());
        stats.put("inProgress", allClaims.stream().filter(c -> c.getStatus() == Claim.ClaimStatus.IN_PROGRESS).count());
        stats.put("resolved", allClaims.stream().filter(c -> c.getStatus() == Claim.ClaimStatus.RESOLVED).count());
        stats.put("closed", allClaims.stream().filter(c -> c.getStatus() == Claim.ClaimStatus.CLOSED).count());
        stats.put("rejected", allClaims.stream().filter(c -> c.getStatus() == Claim.ClaimStatus.REJECTED).count());
        
        Map<String, Long> byCategory = new HashMap<>();
        for (Claim.ClaimCategory cat : Claim.ClaimCategory.values()) {
            byCategory.put(cat.name(), allClaims.stream().filter(c -> c.getCategory() == cat).count());
        }
        stats.put("byCategory", byCategory);
        
        Map<String, Long> byPriority = new HashMap<>();
        for (Claim.ClaimPriority pri : Claim.ClaimPriority.values()) {
            byPriority.put(pri.name(), allClaims.stream().filter(c -> c.getPriority() == pri).count());
        }
        stats.put("byPriority", byPriority);
        
        // Calculate average resolution time
        double avgResolutionTime = allClaims.stream()
                .filter(c -> c.getResolvedAt() != null)
                .mapToLong(c -> java.time.Duration.between(c.getCreatedAt(), c.getResolvedAt()).toHours())
                .average()
                .orElse(0);
        stats.put("averageResolutionTime", avgResolutionTime);
        
        return stats;
    }
}
