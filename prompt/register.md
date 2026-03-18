# Inscription d'un nouvel utilisateur

- [x] **Formulaire d'inscription**
    - [x] Champs obligatoires
        - [x] Nom d'utilisateur
            - [x] Unique
            - [x] 5-30 caractères
            - [x] Alphanumériques ou underscores
            - [x] Regex: `/^[A-Za-z0-9_]{5,30}$/`
        - [ ] Mot de passe
            - [x] Min 6 caractères
            - [x] 1 majuscule
            - [x] 1 minuscule
            - [x] Regex: `/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/`
        - [x] Adresse mail
            - [x] Validation du format: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
       <!--  - [ ] Date de naissance
            - [ ] Calcul d’âge (âge > 13)
        - [ ] Groupe ethnique (champ obligatoire, liste déroulante ou champ) -->

- [x] **Validation en temps réel (frontend + API)**
    - [x] Nom d'utilisateur déjà utilisé (API: `GET /users/check-username?username=xxx`)
    - [x] Adresse mail déjà utilisée (API: `GET /users/check-email?email=xxx`)
    - [x] Indication de force de mot de passe (calcul local ou API, ex: zxcvbn)
    - [x] Validation du format d’email (regex côté frontend)
    
- [ ] **Sécurité**
    - [ ] Captcha anti-bot (Google reCAPTCHA ou hCaptcha avant soumission)
    - [x] Hash du mot de passe côté serveur (`bcrypt.hash(password, saltRounds)`)
    - [x] Protection injection SQL (ORM sécurisé : Sequelize, Prisma, TypeORM, etc., ou requêtes paramétrées)

- [ ] **Après soumission**
    - [ ] Message de vérification envoyé à l’email (API: `POST /api/register`)
    - [ ] Message confirmation affiché (notification frontend)
    - [x] Redirection vers page “Vérifier votre email” (`/verify-email`)

- [ ] **Documentation attendue**
    - [x] Code frontend (formulaire, validation, feedback)
    - [x] Code backend/API (routes, sécurité, hash, mailer)
    - [ ] Documentation API (OpenAPI/Swagger)
    - [x] Tests unitaires & end-to-end (validation, sécurité, coverage, test CAPTCHA)
    - [x] Déploiement production (CI/CD, logs, protection secrets)

---

### Exemple : structure d’un fichier API

```yaml
paths:
  /users/register:
    post:
      description: "Inscription d'un nouvel utilisateur"
      requestBody:
        username: string
        email: string
        password: string
        required: true
      # (etc…)
```