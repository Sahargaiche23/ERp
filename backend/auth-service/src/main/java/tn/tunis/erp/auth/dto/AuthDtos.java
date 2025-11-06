package tn.tunis.erp.auth.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public class AuthDtos {
    public record RegisterRequest(String username, String email, String password, String role) {}
    public record LoginRequest(String username, String password) {}
    public record OtpSendRequest(String username, String purpose) {}
    public record OtpVerifyRequest(String username, String code, String purpose) {}
    public record PasswordResetRequest(String username, String newPassword) {}
    public record ResetPasswordByEmailRequest(String email) {}
    public record OtpVerifyAndResetRequest(String email, String code, String newPassword) {}
    public record UpdateRoleRequest(String role) {}
    public record JwtResponse(String accessToken, String refreshToken) {}
    
    public record UserResponse(
        UUID id,
        String username,
        String email,
        String phone,
        String role,
        String status,
        OffsetDateTime createdAt
    ) {}
}
