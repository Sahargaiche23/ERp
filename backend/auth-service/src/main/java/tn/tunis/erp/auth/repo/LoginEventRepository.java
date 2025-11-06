package tn.tunis.erp.auth.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.auth.domain.LoginEvent;

import java.util.UUID;

public interface LoginEventRepository extends JpaRepository<LoginEvent, UUID> {
}
