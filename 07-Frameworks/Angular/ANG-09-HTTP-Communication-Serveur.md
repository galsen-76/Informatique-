---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M04
aliases:
  - "HTTP & Communication Serveur Angular"
tags:
  - frameworks/angular/http
parent: "[[Angular]]"
children:
  - "[[ANG-21-Guards-Resolvers-Intercepteurs|Intercepteurs HTTP Angular]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-httpclient]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/http"
---

# HTTP & Communication Serveur Angular

> [!abstract] Introduction
> `HttpClient` est l'outil Angular pour envoyer et recevoir des données depuis une API, en retournant un `Observable` par requête.

> [!warning]- Prérequis
> [[ANG-05-Services-DI|Services et DI Angular]], [[ANG-08-RxJS|Programmation Réactive RxJS Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> ```typescript
> private http = inject(HttpClient);
> this.http.get<Film[]>('https://api.example.com/films');
> ```

> [!example]- Analogie
> `HttpClient` est un facteur : tu lui donnes une lettre (la requête), il part la livrer et revient avec une réponse — mais tu ne restes pas planté à sa porte, tu t'abonnes (`subscribe`) pour être prévenu à son retour.

> [!question]- Pourquoi l'utiliser ?
> Simplifie les échanges HTTP par rapport au `fetch()` brut, et s'intègre nativement avec RxJS.

> [!question]- Comment ça marche ?
> ```typescript
> this.filmService.obtenirFilms().pipe(
>   catchError(() => of([]))
> ).subscribe(films => console.log(films));
> ```

> [!question]- Quand l'utiliser ?
> Dès qu'une application communique avec un serveur distant — quasiment toujours.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Ne jamais oublier la gestion d'erreur (`catchError`) — sans elle, une panne réseau fait planter silencieusement le flux entier.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `HttpClient` | Service Angular pour requêtes HTTP |
| Intercepteur | Code exécuté automatiquement à CHAQUE requête |

---

## Points clés

- `.get()`, `.post()`, `.put()`, `.delete()` correspondent aux méthodes HTTP
- Chaque appel retourne un `Observable`, rien ne se passe sans `.subscribe()`
- Toujours gérer les erreurs avec `catchError`
- Un intercepteur ajoute automatiquement une info à chaque requête (ex : token)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `.subscribe()`, croyant que la requête part toute seule
> - Ne pas typer la réponse (`http.get<Film[]>`), perdant l'autocomplétion et la sécurité de type
> - Absence de `catchError`, faisant planter tout le flux à la moindre erreur réseau

---

## Paramètres / Configuration

| Méthode | Description |
|-----------|-------------|
| `http.get<T>(url)` | Récupère des données |
| `http.post(url, body)` | Envoie des données |
| `http.put(url, body)` | Remplace une ressource |
| `http.delete(url)` | Supprime une ressource |

---

## Exemple minimal

```typescript
obtenirFilms() {
  return this.http.get<Film[]>(this.url).pipe(
    catchError(() => of([]))
  );
}
```

> [!note] Ce que j'en retiens
> Le service encapsule toute la logique d'accès au serveur — le composant reçoit juste un `Observable<Film[]>` à écouter.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `provideHttpClient(withInterceptors([...]), withFetch())` dans `app.config.ts`
> - Tester avec `provideHttpClientTesting()` et `HttpTestingController`
> - `httpResource()` (API récente) pour des requêtes pilotées par signals

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-21-Guards-Resolvers-Intercepteurs|Intercepteurs HTTP Angular]]
- À comparer avec → [[ANG-08-RxJS|Programmation Réactive RxJS Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-httpclient]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi `catchError` est indispensable, avec un exemple concret d'échec réseau ?

> [!faq]- Questions d'entretien
> - Comment gérez-vous les erreurs HTTP de façon globale ?

---

## Tâches

- [ ] #task Connecter CinéTrack à une vraie API via `HttpClient`
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment tester un service `HttpClient` sans faire de vrais appels réseau ?
