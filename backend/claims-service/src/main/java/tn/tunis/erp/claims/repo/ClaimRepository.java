package tn.tunis.erp.claims.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.claims.domain.Claim;

import java.util.UUID;

public interface ClaimRepository extends JpaRepository<Claim, UUID> {
}
