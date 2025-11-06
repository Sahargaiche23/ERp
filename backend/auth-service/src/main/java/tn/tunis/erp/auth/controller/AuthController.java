package tn.tunis.erp.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.tunis.erp.auth.dto.AuthDtos;
import tn.tunis.erp.auth.service.AuthService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthDtos.RegisterRequest req) {
        try {
            log.info("Register request for username: {}", req.username());
            authService.register(req);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDtos.LoginRequest req, HttpServletRequest http) {
        try {
            log.info("Login request for username: {}", req.username());
            var resp = authService.login(req.username(), req.password(), clientIp(http), http.getHeader("User-Agent"));
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping("/otp/send")
    public ResponseEntity<?> sendOtp(@RequestBody AuthDtos.OtpSendRequest req) {
        try {
            log.info("OTP send request for username: {} with purpose: {}", req.username(), req.purpose());
            authService.sendOtp(req.username(), req.purpose());
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to send OTP: {}", e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPasswordByEmail(@RequestBody AuthDtos.ResetPasswordByEmailRequest req) {
        try {
            log.info("Password reset request by email: {}", req.email());
            authService.sendOtpByEmail(req.email(), "RESET");
            Map<String, String> response = new HashMap<>();
            response.put("message", "Un code OTP a été envoyé à votre email");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to send reset OTP: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtpAndResetPassword(@RequestBody AuthDtos.OtpVerifyAndResetRequest req) {
        try {
            log.info("OTP verification and password reset for email: {}", req.email());
            var user = authService.verifyOtpByEmail(req.email(), req.code(), "RESET");
            authService.resetPassword(user.getUsername(), req.newPassword());
            
            // Auto-login after password reset
            var resp = authService.login(user.getUsername(), req.newPassword(), clientIp(null), "password-reset");
            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            log.error("OTP verification or reset failed: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody AuthDtos.OtpVerifyRequest req) {
        try {
            log.info("OTP verify request for username: {}", req.username());
            authService.verifyOtp(req.username(), req.code(), req.purpose());
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP verified successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("OTP verification failed: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/reset")
    public ResponseEntity<?> reset(@RequestBody AuthDtos.PasswordResetRequest req) {
        try {
            log.info("Password reset request for username: {}", req.username());
            authService.resetPassword(req.username(), req.newPassword());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Password reset failed: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth service is working!");
    }

    @PostMapping("/admin/users/{userId}/role")
    public ResponseEntity<?> updateUserRole(
            @PathVariable String userId,
            @RequestBody AuthDtos.UpdateRoleRequest req) {
        try {
            log.info("Admin updating role for user: {}", userId);
            authService.updateUserRole(userId, req.role());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Role updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to update role: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @GetMapping("/admin/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            var users = authService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            log.error("Failed to get users: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    private String clientIp(HttpServletRequest request) {
        if (request == null) return "127.0.0.1";
        String xf = request.getHeader("X-Forwarded-For");
        if (xf != null && !xf.isBlank()) return xf.split(",")[0].trim();
        return request.getRemoteAddr();
    }
}
