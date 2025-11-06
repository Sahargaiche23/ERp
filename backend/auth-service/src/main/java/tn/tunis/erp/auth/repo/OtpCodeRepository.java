package tn.tunis.erp.auth.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.auth.domain.OtpCode;
import tn.tunis.erp.auth.domain.User;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

public interface OtpCodeRepository extends JpaRepository<OtpCode, UUID> {
    Optional<OtpCode> findTopByUserAndPurposeAndConsumedIsFalseAndExpiresAtAfterOrderByCreatedAtDesc(User user, String purpose, OffsetDateTime now);
}
