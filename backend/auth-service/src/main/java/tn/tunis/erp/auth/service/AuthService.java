package tn.tunis.erp.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.tunis.erp.auth.domain.LoginEvent;
import tn.tunis.erp.auth.domain.OtpCode;
import tn.tunis.erp.auth.domain.User;
import tn.tunis.erp.auth.dto.AuthDtos;
import tn.tunis.erp.auth.repo.LoginEventRepository;
import tn.tunis.erp.auth.repo.OtpCodeRepository;
import tn.tunis.erp.auth.repo.UserRepository;
import tn.tunis.erp.auth.security.JwtService;

import java.time.OffsetDateTime;
import java.util.HashMap;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository users;
    private final OtpCodeRepository otps;
    private final LoginEventRepository events;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final MailService mailService;

    public AuthService(UserRepository users, OtpCodeRepository otps, LoginEventRepository events,
                       PasswordEncoder encoder, JwtService jwtService, MailService mailService) {
        this.users = users;
        this.otps = otps;
        this.events = events;
        this.encoder = encoder;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }

    @Transactional
    public void register(AuthDtos.RegisterRequest req) {
        log.info("Registering user: {}", req.username());
        
        // Check if username already exists
        if (users.findByUsername(req.username()).isPresent()) {
            log.error("Username already exists: {}", req.username());
            throw new RuntimeException("Username already exists");
        }
        
        // Check if email already exists
        if (users.findByEmail(req.email()).isPresent()) {
            log.error("Email already exists: {}", req.email());
            throw new RuntimeException("Email already exists");
        }
        
        User u = new User();
        u.setUsername(req.username());
        u.setEmail(req.email());
        u.setPasswordHash(encoder.encode(req.password()));
        u.setRole(req.role() == null ? "CITIZEN" : req.role());
        u.setStatus("ACTIVE");
        users.save(u);
        log.info("User registered successfully: {} with role: {}", req.username(), u.getRole());
    }

    @Transactional
    public AuthDtos.JwtResponse login(String username, String password, String ip, String userAgent) {
        log.info("Login attempt for user: {} from IP: {}", username, ip);
        Optional<User> ou = users.findByUsername(username);
        boolean success = false;
        if (ou.isPresent()) {
            User u = ou.get();
            
            // Check if user is locked
            if ("LOCKED".equals(u.getStatus())) {
                log.error("User account is locked: {}", username);
                recordEvent(u, ip, userAgent, false);
                throw new RuntimeException("Account is locked");
            }
            
            success = encoder.matches(password, u.getPasswordHash());
            if (success) {
                var claims = new HashMap<String, Object>();
                claims.put("role", u.getRole());
                claims.put("username", u.getUsername());
                claims.put("email", u.getEmail());
                String access = jwtService.generate(claims, u.getId().toString(), 15 * 60);
                String refresh = jwtService.generate(claims, u.getId().toString(), 7 * 24 * 3600);
                recordEvent(u, ip, userAgent, true);
                log.info("Login successful for user: {} with role: {}", username, u.getRole());
                return new AuthDtos.JwtResponse(access, refresh);
            }
        }
        log.error("Login failed for user: {}", username);
        recordEvent(ou.orElse(null), ip, userAgent, false);
        throw new RuntimeException("Invalid credentials");
    }

    @Transactional
    public void sendOtpByEmail(String email, String purpose) {
        log.info("Sending OTP to email: {} for purpose: {}", email, purpose);
        User u = users.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("User not found with email: {}", email);
                    return new RuntimeException("Utilisateur non trouvé");
                });
        
        String code = generateOtp();
        OtpCode otp = new OtpCode();
        otp.setUser(u);
        otp.setCode(code);
        otp.setPurpose(purpose);
        otp.setExpiresAt(OffsetDateTime.now().plusMinutes(5));
        otps.save(otp);
        
        // Log OTP code for testing (in production, this should be removed)
        log.warn("=== OTP CODE FOR TESTING === User: {}, Email: {}, Code: {}, Purpose: {}, Expires: {}", 
                u.getUsername(), email, code, purpose, otp.getExpiresAt());
        
        String emailSubject = "ERP Tunis - Code OTP";
        String emailText = String.format(
            "Bonjour %s,\n\n" +
            "Votre code de vérification OTP est: %s\n\n" +
            "Ce code est valable pendant 5 minutes.\n\n" +
            "Si vous n'avez pas demandé ce code, veuillez ignorer cet email.\n\n" +
            "Cordialement,\n" +
            "L'équipe ERP Tunis",
            u.getUsername(), code
        );
        
        mailService.send(u.getEmail(), emailSubject, emailText);
        log.info("OTP sent successfully to: {} ({})", u.getUsername(), u.getEmail());
    }

    @Transactional
    public void sendOtp(String username, String purpose) {
        log.info("Sending OTP to user: {} for purpose: {}", username, purpose);
        User u = users.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found: {}", username);
                    return new RuntimeException("User not found");
                });
        
        String code = generateOtp();
        OtpCode otp = new OtpCode();
        otp.setUser(u);
        otp.setCode(code);
        otp.setPurpose(purpose);
        otp.setExpiresAt(OffsetDateTime.now().plusMinutes(5));
        otps.save(otp);
        
        // Log OTP code for testing (in production, this should be removed)
        log.warn("=== OTP CODE FOR TESTING === User: {}, Code: {}, Purpose: {}, Expires: {}", 
                username, code, purpose, otp.getExpiresAt());
        
        String emailSubject = "ERP Tunis - Code OTP";
        String emailText = String.format(
            "Bonjour %s,\n\n" +
            "Votre code de vérification OTP est: %s\n\n" +
            "Ce code est valable pendant 5 minutes.\n\n" +
            "Si vous n'avez pas demandé ce code, veuillez ignorer cet email.\n\n" +
            "Cordialement,\n" +
            "L'équipe ERP Tunis",
            u.getUsername(), code
        );
        
        mailService.send(u.getEmail(), emailSubject, emailText);
        log.info("OTP sent successfully to: {} ({})", username, u.getEmail());
    }

    @Transactional
    public User verifyOtpByEmail(String email, String code, String purpose) {
        log.info("Verifying OTP for email: {} with purpose: {}", email, purpose);
        User u = users.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("User not found with email: {}", email);
                    return new RuntimeException("Utilisateur non trouvé");
                });
        
        OtpCode otp = otps.findTopByUserAndPurposeAndConsumedIsFalseAndExpiresAtAfterOrderByCreatedAtDesc(
                u, purpose, OffsetDateTime.now()
        ).orElseThrow(() -> {
            log.error("No valid OTP found for email: {} with purpose: {}", email, purpose);
            return new RuntimeException("OTP invalide ou expiré");
        });
        
        if (!otp.getCode().equals(code)) {
            log.error("Invalid OTP code for email: {}", email);
            throw new RuntimeException("Code OTP incorrect");
        }
        
        otp.setConsumed(true);
        otps.save(otp);
        log.info("OTP verified successfully for email: {}", email);
        return u;
    }

    @Transactional
    public void verifyOtp(String username, String code, String purpose) {
        log.info("Verifying OTP for user: {} with purpose: {}", username, purpose);
        User u = users.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found: {}", username);
                    return new RuntimeException("User not found");
                });
        
        OtpCode otp = otps.findTopByUserAndPurposeAndConsumedIsFalseAndExpiresAtAfterOrderByCreatedAtDesc(
                u, purpose, OffsetDateTime.now()
        ).orElseThrow(() -> {
            log.error("No valid OTP found for user: {} with purpose: {}", username, purpose);
            return new RuntimeException("OTP invalide ou expiré");
        });
        
        if (!otp.getCode().equals(code)) {
            log.error("Invalid OTP code for user: {}", username);
            throw new RuntimeException("Code OTP incorrect");
        }
        
        otp.setConsumed(true);
        otps.save(otp);
        log.info("OTP verified successfully for user: {}", username);
    }

    @Transactional
    public void resetPassword(String username, String newPassword) {
        log.info("Resetting password for user: {}", username);
        User u = users.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found: {}", username);
                    return new RuntimeException("User not found");
                });
        u.setPasswordHash(encoder.encode(newPassword));
        users.save(u);
        log.info("Password reset successfully for user: {}", username);
    }

    @Transactional
    public void updateUserRole(String userId, String role) {
        log.info("Updating role for user: {} to: {}", userId, role);
        User u = users.findById(UUID.fromString(userId))
                .orElseThrow(() -> {
                    log.error("User not found: {}", userId);
                    return new RuntimeException("Utilisateur non trouvé");
                });
        u.setRole(role);
        users.save(u);
        log.info("Role updated successfully for user: {}", userId);
    }

    public java.util.List<AuthDtos.UserResponse> getAllUsers() {
        log.info("Fetching all users");
        return users.findAll().stream()
                .map(u -> new AuthDtos.UserResponse(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getPhone(),
                        u.getRole(),
                        u.getStatus(),
                        u.getCreatedAt()
                ))
                .collect(java.util.stream.Collectors.toList());
    }

    private void recordEvent(User u, String ip, String userAgent, boolean success) {
        LoginEvent ev = new LoginEvent();
        ev.setUser(u);
        ev.setIp(ip);
        ev.setUserAgent(userAgent);
        ev.setSuccess(success);
        events.save(ev);
    }

    private String generateOtp() {
        int n = new Random().nextInt(900000) + 100000; // 6 digits
        return String.valueOf(n);
    }
}
