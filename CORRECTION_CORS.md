# Correction du Problème CORS - Inscription

## 🐛 Problème Identifié

L'inscription échouait dans le navigateur avec l'erreur suivante:
```
Échec de l'inscription. Veuillez réessayer.
```

Dans la console du navigateur, des erreurs CORS étaient visibles:
- `Cross-Origin Request Blocked`
- Requêtes OPTIONS (preflight) retournaient un HTTP 403 Forbidden

## 🔍 Cause Racine

La configuration de sécurité Spring Security dans `SecurityConfig.java` ne gérait pas correctement les requêtes CORS. Les requêtes préliminaires (OPTIONS) envoyées par le navigateur étaient rejetées.

## ✅ Solution Appliquée

### Modification du fichier: `/backend/auth-service/src/main/java/tn/tunis/erp/auth/config/SecurityConfig.java`

#### Ajout des imports CORS:
```java
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;
import java.util.List;
```

#### Configuration CORS dans le SecurityFilterChain:
```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // ← AJOUTÉ
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/actuator/health", "/api/auth/**").permitAll()
                    .anyRequest().authenticated()
            );
    return http.build();
}
```

#### Création du Bean CorsConfigurationSource:
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:4200"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

## 📊 Résultats des Tests

### Test CORS (Requête OPTIONS):
```bash
curl -X OPTIONS http://localhost:8081/api/auth/register \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: POST"
```

**Avant la correction**: HTTP 403 Forbidden ❌

**Après la correction**: HTTP 200 OK ✅
```
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 3600
```

### Test d'Inscription (Requête POST):
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser123","email":"testuser123@example.com","password":"password123","role":"CITIZEN"}'
```

**Résultat**: HTTP 200 OK ✅

## 🎯 Configuration CORS Expliquée

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| **AllowedOrigins** | `http://localhost:4200` | Frontend Angular autorisé |
| **AllowedMethods** | `GET, POST, PUT, DELETE, OPTIONS` | Méthodes HTTP autorisées |
| **AllowedHeaders** | `*` | Tous les headers autorisés |
| **AllowCredentials** | `true` | Permet l'envoi de cookies/credentials |
| **MaxAge** | `3600` | Cache la réponse preflight pendant 1h |

## 🔄 Étapes de Déploiement

1. ✅ Modification du fichier `SecurityConfig.java`
2. ✅ Compilation: `mvn clean compile`
3. ✅ Redémarrage du service auth-service
4. ✅ Vérification CORS avec curl
5. ✅ Test fonctionnel de l'inscription

## 📱 Test dans le Navigateur

Vous pouvez maintenant tester l'inscription à l'adresse:
```
http://localhost:4200/register
```

Le formulaire devrait fonctionner correctement sans erreurs CORS.

## 🔧 Remarques Importantes

1. **Production**: Remplacer `http://localhost:4200` par l'URL réelle du frontend
2. **Sécurité**: Ne pas utiliser `*` pour AllowedOrigins en production
3. **AllowedHeaders**: Peut être restreint aux headers spécifiques utilisés
4. **MaxAge**: Peut être ajusté selon les besoins de performance

## 🎉 Résultat Final

✅ L'inscription fonctionne maintenant correctement depuis le frontend Angular vers le backend Spring Boot
✅ Les requêtes CORS sont correctement gérées
✅ Les headers de sécurité sont configurés
✅ Le système est prêt pour l'utilisation
