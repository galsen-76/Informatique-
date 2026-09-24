---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M10
aliases:
  - "Architecture en Couches (Layered)"
tags:
  - cs/architecture/couches
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-01-Fondamentaux|Fondamentaux Architecture]]"
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://en.wikipedia.org/wiki/Multitier_architecture"
---

# Architecture en Couches (Layered)

> [!abstract] Introduction
> L'architecture en couches organise le code d'une application en niveaux empilés (présentation, logique métier, accès aux données), où chaque couche ne communique qu'avec la couche directement adjacente, pour séparer clairement les responsabilités.

---

## Théorie

> [!question]- C'est quoi ?
> Les 3 couches classiques (parfois appelées architecture "3-tier") :
> 1. **Couche présentation** : ce que voit et manipule l'utilisateur (interface Angular, ou réponses d'une API)
> 2. **Couche métier (business logic)** : les règles et calculs propres au domaine de l'application
> 3. **Couche accès aux données** : la communication avec la base de données ou une API externe
>
> > [!note] Pourquoi séparer ces 3 responsabilités ?
> > Sans séparation, une même fonction pourrait mélanger "afficher un formulaire", "vérifier si le prix est valide" et "écrire dans la base de données" — difficile à tester, à modifier, et à comprendre. Séparer permet de modifier une couche SANS toucher aux autres (changer de base de données sans toucher à la logique métier, par exemple).

> [!question]- Pourquoi l'utiliser ?
> Cette séparation rend le code plus facile à TESTER (on peut tester la logique métier sans avoir besoin d'une vraie base de données), plus facile à FAIRE ÉVOLUER (changer l'interface sans toucher au métier), et plus facile à COMPRENDRE pour un nouveau développeur qui rejoint le projet.

> [!question]- Comment ça marche ?
> **Exemple concret en Python (backend) :**
>
> ```python
> # Couche accès aux données (repository)
> class FilmRepository:
>     def obtenir_par_id(self, id):
>         # requête SQL ou appel API, PAS de logique métier ici
>         return base_de_donnees.query(f"SELECT * FROM films WHERE id={id}")
>
> # Couche métier (service)
> class FilmService:
>     def __init__(self, repository):
>         self.repository = repository
>
>     def calculer_age_film(self, id):
>         film = self.repository.obtenir_par_id(id)
>         return 2026 - film["annee"]  # LOGIQUE MÉTIER, pas d'accès direct à la BDD
>
> # Couche présentation (contrôleur/API)
> @app.get("/films/{id}/age")
> def obtenir_age(id: int):
>     service = FilmService(FilmRepository())
>     return {"age": service.calculer_age_film(id)}
> ```
>
> > [!note] Ce que chaque couche NE FAIT PAS
> > Le `FilmRepository` ne connaît RIEN à la logique de calcul d'âge — il sait seulement aller chercher des données. Le `FilmService` ne sait RIEN écrire en base de données directement — il utilise le repository pour ça. Le contrôleur (route API) ne contient AUCUN calcul — il délègue tout au service.
>
> **Bénéfice concret pour les tests :**
> ```python
> # On peut tester le calcul d'âge SANS vraie base de données
> class FausseRepository:
>     def obtenir_par_id(self, id):
>         return {"annee": 2010}  # donnée fictive, pas de vraie BDD
>
> service = FilmService(FausseRepository())
> assert service.calculer_age_film(1) == 16
> ```
> > [!note] Pourquoi c'est possible
> > Comme le `FilmService` ne dépend que d'un repository (peu importe LEQUEL), on peut lui donner une fausse version pour tester la LOGIQUE seule, sans dépendre d'une vraie base de données lente ou complexe à mettre en place pour un simple test.
>
> **En Angular, cette séparation existe aussi :**
> - Composants (`*.component.ts`) = couche présentation
> - Services (`*.service.ts`) = logique métier et accès aux données (souvent fusionnés côté frontend)

> [!question]- Quand l'utiliser ?
> Dans quasiment toute application backend structurée, dès qu'elle dépasse quelques routes simples — cette séparation devient rapidement indispensable pour garder le code testable et compréhensible.


### Schéma

![[Architecture_backend.png]]

> Requête HTTP → controller (mappe la requête, vérifie la sécurité) → service métier → DAO / repository → base de données, puis réponse en sens inverse.

---

## Points clés

- 3 couches classiques : présentation, métier, accès aux données
- Chaque couche a UNE responsabilité claire et ne devrait pas empiéter sur les autres
- Cette séparation rend le code testable indépendamment de la base de données réelle
- En Angular, les composants (présentation) et services (métier/données) reflètent cette même logique
- Éviter que la couche présentation contienne de la logique métier, ou que la logique métier fasse des requêtes SQL directement

---

## Paramètres / Configuration

| Couche | Responsabilité | Exemple |
|-----------|-------------|---------|
| Présentation | Interface utilisateur, routes API | Composant Angular, contrôleur FastAPI |
| Métier (Business Logic) | Règles, calculs, validations | Service contenant la logique |
| Accès aux données | Lecture/écriture BDD ou API externe | Repository, ORM |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Controller qui accède directement à la BDD (couche sautée)
> - Logique métier dispersée dans les composants front

---

## Exemple minimal

```typescript
// Angular : même logique de séparation

// Service (métier + accès données, souvent fusionné côté frontend)
@Injectable({ providedIn: 'root' })
export class FilmService {
  private http = inject(HttpClient);

  obtenirFilms() {
    return this.http.get<Film[]>('/api/films'); // accès aux données
  }
}

// Composant (présentation uniquement)
@Component({ /* ... */ })
export class ListeFilmsComponent {
  private filmService = inject(FilmService);
  films = toSignal(this.filmService.obtenirFilms()); // PAS de logique métier ici
}
```

> [!note] Ce que j'en retiens
> Le composant Angular ne fait QUE demander des données au service et les afficher — toute logique de transformation ou de calcul devrait vivre dans le service, jamais directement dans le composant.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Évolution vers l'[[ARCH-12-Clean-Architecture-Hexagonale|Architecture Hexagonale et Clean Architecture]] quand le domaine se complexifie

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-02-Monolithe-vs-Microservices|Monolithe vs Microservices]], [[ARCH-07-Design-Patterns-Fondamentaux|Design Patterns Fondamentaux]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quel est le rôle de chaque couche (controller, service, accès aux données) ?

> [!faq]- Questions d'entretien
> - Décrivez l'architecture en couches d'une API.

---

## Tâches

- [ ] #task Identifier dans un projet Angular existant si un composant contient de la logique métier qui devrait être dans un service
- [ ] #task Écrire une couche repository/service minimaliste en Python pour un futur backend
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Dans une architecture en couches stricte, la couche présentation a-t-elle le droit de parler DIRECTEMENT à la couche d'accès aux données, en sautant la couche métier, dans certains cas simples ?
