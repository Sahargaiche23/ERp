package tn.tunis.erp.claims.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "claims", schema = "claims")
public class Claim {
    @Id
    @Column(nullable = false)
    private UUID id;

    @Column(name = "citizen_name", nullable = false)
    private String citizenName;

    @Column(name = "citizen_email")
    private String citizenEmail;

    @Column(name = "citizen_phone")
    private String citizenPhone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimCategory category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimPriority priority = ClaimPriority.MEDIUM;

    @Column(nullable = false)
    private String subject;

    @Column(length = 2000)
    private String description;

    @Column
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimStatus status = ClaimStatus.NEW;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(length = 1000)
    private String resolution;

    @Column(length = 2000)
    private String response;

    public enum ClaimCategory {
        INFRASTRUCTURE, SANITATION, LIGHTING, SECURITY, ADMINISTRATIVE, OTHER,
        VOIRIE, ECLAIRAGE, PROPRETE, EAU, ESPACES_VERTS, SIGNALISATION, AUTRE
    }

    public enum ClaimPriority {
        LOW, MEDIUM, HIGH, URGENT
    }

    public enum ClaimStatus {
        NEW, IN_PROGRESS, RESOLVED, CLOSED, REJECTED,
        NOUVEAU, EN_COURS, RESOLU, REFUSE, EN_ATTENTE
    }

    @PrePersist
    public void prePersist(){
        if (id == null) id = UUID.randomUUID();
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        updatedAt = LocalDateTime.now();
    }

    // getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public String getCitizenName() { return citizenName; }
    public void setCitizenName(String citizenName) { this.citizenName = citizenName; }
    
    public String getCitizenEmail() { return citizenEmail; }
    public void setCitizenEmail(String citizenEmail) { this.citizenEmail = citizenEmail; }
    
    public String getCitizenPhone() { return citizenPhone; }
    public void setCitizenPhone(String citizenPhone) { this.citizenPhone = citizenPhone; }
    
    public ClaimCategory getCategory() { return category; }
    public void setCategory(ClaimCategory category) { this.category = category; }
    
    public ClaimPriority getPriority() { return priority; }
    public void setPriority(ClaimPriority priority) { this.priority = priority; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { this.status = status; }
    
    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
    
    public String getResolution() { return resolution; }
    public void setResolution(String resolution) { this.resolution = resolution; }
    
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
}
