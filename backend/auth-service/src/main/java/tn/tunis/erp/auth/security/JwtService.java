package tn.tunis.erp.auth.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    @Value("${JWT_SECRET:change_me_super_secret_key_for_jwt_token_generation_at_least_256_bits}")
    private String secret;

    public String generate(Map<String, Object> claims, String subject, long expiresInSeconds) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(expiresInSeconds)))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getKey() {
        // Ensure the secret is at least 32 bytes (256 bits) for HS256
        String paddedSecret = secret;
        while (paddedSecret.length() < 32) {
            paddedSecret += paddedSecret;
        }
        if (paddedSecret.length() > 64) {
            paddedSecret = paddedSecret.substring(0, 64);
        }
        byte[] keyBytes = paddedSecret.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        if (keyBytes.length < 32) {
            keyBytes = java.util.Arrays.copyOf(keyBytes, 32);
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
