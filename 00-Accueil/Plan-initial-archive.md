---
modified: 2026-09-17
---
📁 00-Conception/                🆕 — la réflexion AVANT d'écrire une ligne de code
   📁 Recueil-des-Besoins/
      - Cahier des charges (fonctionnel vs technique)
      - User stories (format "En tant que... je veux... afin de...")
      - Critères d'acceptation
   📁 UML/
      - Diagramme de cas d'utilisation (use case)
      - Diagramme de classes
      - Diagramme de séquence
      - Diagramme d'activité
   📁 Wireframing-Maquettage/
      - Wireframe vs mockup vs prototype (les 3 niveaux de fidélité)
      - Outils (Figma, etc.)
      - Du wireframe au composant Angular réel
   📁 Modelisation-des-Donnees/
      - MCD / MLD (Modèle Conceptuel/Logique de Données)
      - Identifier les entités et leurs relations dès la conception
   📁 Architecture-Decision-Records/
      - C'est quoi un ADR (documenter POURQUOI un choix technique a été fait)
      - Format type (contexte, décision, conséquences)
   📁 Estimation-Planification/
      - Découpage en tâches/user stories
      - Story points, planning poker
      - Lien direct avec [[app-planification-sprints]]

📁 01-Methodologie/               (déplacé — le cadre dans lequel la conception s'organise)
   📁 Agile-Scrum/
   📁 Documentation-Technique/

📁 02-Algorithmes-Structures-de-Donnees/  (déplacé — les fondations de la pensée algorithmique, avant tout langage)
   📁 Complexite-Big-O/
   📁 Structures/
   📁 Tri-Recherche/

📁 03-Langages/
   📁 Python/                    ✅ fait — 16 notes
   📁 TypeScript/                ✅ fait — 15 notes
   📁 SQL/                       ⚠️ à faire
   📁 Theorie-Generale/          ✅ fait — 10 notes

📁 04-Versionning/                (déplacé — dès qu'on écrit du code, on versionne)
   📁 Git-Fondamentaux/          ⚠️ à faire
   📁 GitLab/                    ✅ fait — 8 notes
   📁 Conventions/               ⚠️ à ajouter

📁 05-Outils/                     (déplacé — l'IDE avec lequel on écrit tout ce code)
   📁 IntelliJ/                  ✅ fait — 10 notes

📁 06-Bases-de-Donnees/          🔴 manque entier
   📁 SQL-Fondamentaux/
   📁 Modelisation-Relationnelle/
   📁 NoSQL/
   📁 Migrations/
   📁 Indexation-Performance/
   📁 Transactions-ACID/

📁 07-Frameworks/                 (renuméroté — construits par-dessus langages + données)
   📁 Angular/                   ✅ fait — 17 notes
   📁 Backend/                   ⚠️ à faire — FastAPI ou NestJS
   📁 ORM/                       ⚠️ à faire — SQLAlchemy ou Prisma

📁 08-Architecture/               (renuméroté — comment structurer ce qu'on construit avec ces frameworks)
   📁 Clean-Code-SOLID/          ⚠️ à ajouter
   📁 Domain-Driven-Design/      (optionnel)

📁 09-Securite/                  🔴 manque entier — (renuméroté, dès qu'on a une vraie appli)
   📁 Authentification/
   📁 Vulnerabilites-OWASP/
   📁 HTTPS-TLS/                 → recoupe [[NET-08-Pare-feu-Securite-Reseau|10-Reseaux/Securite-Reseau]]
   📁 Gestion-des-Secrets/

📁 10-Tests-Qualite/              (renuméroté — vérifier ce qu'on a construit)
   📁 Types-de-Tests/
   📁 TDD/
   📁 Code-Review/

📁 11-Reseaux/                   🔴 manque entier — (avant l'infra, car l'infra repose dessus)
   📁 Fondamentaux/
   📁 Protocoles-de-Transport/
   📁 DNS/
   📁 HTTP-Approfondi/
   📁 Securite-Reseau/ (dont Pare-feu/)
   📁 Infrastructure-Reseau/ (dont Proxy/)
   📁 Sockets-Communication-Bas-Niveau/
   📁 Outils-Diagnostic/
   📁 Linux-et-Reseau/

📁 12-Infrastructure/             (renuméroté — déployer, en s'appuyant sur les notions réseau ci-dessus)
   📁 Docker/                    ✅ fait — 8 notes
   📁 CI-CD/                     (à généraliser)
   📁 Cloud-Deploiement/         ⚠️ à faire
   📁 Monitoring-Observabilite/  ⚠️ à faire

📁 13-Intelligence-Artificielle/  🆕 — domaine spécialisé, en bout de parcours
   📁 Fondamentaux-IA-ML/
   📁 LLM-Fondamentaux/
   📁 Prompt-Engineering/
   📁 RAG-Embeddings/
   📁 APIs-LLM/
   📁 Agents-IA-Multiagents/
   📁 IA-Assistee-Dev/
   📁 Ethique-Limites-IA/