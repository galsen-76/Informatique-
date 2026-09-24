---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - reseaux/proxy
aliases:
  - "Proxy Reverse Proxy et Load Balancer"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[CLOUD-02-Heberger-Front|Héberger un Front]]"
  - "[[ARCH-06-Scalabilite|Scalabilité]]"
  - "[[SEC-09-HTTPS-TLS|HTTPS et TLS]]"
related_snippets:
  - "[[04_Snippets/net-09-proxy-reverse-proxy-load-balancer]]"
related_projects: []
source: "https://nginx.org/en/docs/"
---

# Proxy Reverse Proxy et Load Balancer

> [!abstract] Introduction
> Un reverse proxy (Nginx, Traefik, Caddy) reçoit les requêtes publiques et les transmet aux bons services internes ; il gère TLS, compression, cache, et en répartissant la charge sur plusieurs instances il devient load balancer.

> [!warning]- Prérequis
> [[NET-05-HTTP-Approfondi|HTTP Approfondi]]

---

## Théorie

> [!question]- C'est quoi ?
> - **Proxy (forward)** : intermédiaire côté CLIENT (proxy d'entreprise pour sortir sur Internet)
> - **Reverse proxy** : intermédiaire côté SERVEUR (point d'entrée unique devant tes services)
> - **Load balancer** : répartit les requêtes (round-robin, moins de connexions, IP hash) et retire les instances en panne (health checks)

> [!example]- Analogie
> Le reverse proxy est l'hôtesse d'accueil d'une entreprise : les visiteurs ne connaissent que l'accueil, qui les oriente vers le bon service ; s'il y a trois conseillers, elle répartit les visiteurs (load balancer).

> [!question]- Pourquoi l'utiliser ?
> Front et API sous le même domaine (plus de CORS), TLS centralisé, fichiers statiques servis efficacement, scalabilité horizontale et déploiements sans coupure.

> [!question]- Comment ça marche ?
> ```nginx
> upstream api { server api1:3000; server api2:3000; }
> server {
>   listen 443 ssl http2;
>   server_name cinetrack.fr;
>   root /usr/share/nginx/html;              # build Angular/Vue
>   location /api/ {
>     proxy_pass http://api;
>     proxy_set_header Host $host;
>     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>     proxy_set_header X-Forwarded-Proto $scheme;
>   }
>   location / { try_files $uri $uri/ /index.html; }   # routing SPA
> }
> ```

> [!question]- Quand l'utiliser ?
> Dès la mise en production ; en Kubernetes, c'est le rôle de l'Ingress.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Point de défaillance unique s'il n'est pas redondé. Derrière un proxy, l'API doit lire l'IP réelle depuis `X-Forwarded-For` (configurer `trust proxy`).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Reverse proxy | Point d'entrée devant les serveurs |
| Upstream | Groupe de serveurs cibles |
| Health check | Vérification de santé d'une instance |
| Sticky session | Toujours le même serveur pour un client |
| Ingress | Reverse proxy de Kubernetes |

---

## Points clés

- `try_files … /index.html` indispensable pour le routing SPA
- `/api` proxifié → même origine
- TLS terminé au proxy
- Load balancer + health checks = haute disponibilité

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `try_files` → 404 en rafraîchissant `/films/42`
> - Rate limiting basé sur l'IP du proxy au lieu de l'IP client

---

## Exemple minimal

```text
Rafraîchir https://cinetrack.fr/films/42 :
Nginx cherche le fichier /films/42 → absent → renvoie index.html → le router Angular/Vue affiche la bonne page
```

> [!note] Ce que j'en retiens
> C'est la ligne `try_files` qui rend les URLs d'une SPA « rafraîchissables ».

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Configurer Traefik avec découverte automatique des conteneurs et certificats Let's Encrypt

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-09-proxy-reverse-proxy-load-balancer]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi une SPA a-t-elle besoin de `try_files $uri /index.html` ?

> [!faq]- Questions d'entretien
> - Différence entre proxy et reverse proxy ?

---

## Tâches

- [ ] #task Servir CinéTrack front + API derrière un seul Nginx en docker-compose
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
