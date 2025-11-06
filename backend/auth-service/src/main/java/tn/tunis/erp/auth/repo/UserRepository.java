package tn.tunis.erp.auth.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.tunis.erp.auth.domain.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
