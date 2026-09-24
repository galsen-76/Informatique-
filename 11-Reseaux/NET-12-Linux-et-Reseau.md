---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - reseaux/linux
aliases:
  - "Linux et Réseau"
parent: "[[Réseaux]]"
children: []
related_theory:
  - "[[LNX-01-Linux-Essentiels|Linux Essentiels]]"
  - "[[NET-08-Pare-feu-Securite-Reseau|Pare-feu et Sécurité Réseau]]"
  - "[[NET-11-Outils-Diagnostic|Outils de Diagnostic Réseau]]"
related_snippets:
  - "[[04_Snippets/net-12-linux-et-reseau]]"
related_projects: []
source: "https://wiki.archlinux.org/title/Network_configuration"
---

# Linux et Réseau

> [!abstract] Introduction
> La plupart des serveurs sont sous Linux : connaître la configuration réseau de base, SSH, les fichiers `hosts`/`resolv.conf` et les commandes `ip`/`ss` permet d'intervenir sur un serveur ou un conteneur.

> [!warning]- Prérequis
> [[LNX-01-Linux-Essentiels|Linux Essentiels]], [[NET-02-Adresses-IP-Ports|Adresses IP et Ports]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> ip a                        # interfaces et adresses IP
> ip route                    # table de routage
> cat /etc/hosts              # résolution locale
> cat /etc/resolv.conf        # serveurs DNS utilisés
> ss -tulpn                   # ports ouverts et processus
> ssh -i ~/.ssh/id_ed25519 deploy@203.0.113.5
> scp dist.tar.gz deploy@serveur:/srv/app/
> ssh -L 5433:localhost:5432 deploy@serveur   # tunnel : BDD distante accessible en local sur 5433
> ```

> [!example]- Analogie
> SSH est un couloir sécurisé vers la salle des machines ; un tunnel SSH est un passe-plat qui amène un service distant jusqu'à ton bureau sans l'exposer à Internet.

> [!question]- Pourquoi l'utiliser ?
> Déployer, lire des logs, déboguer en recette, accéder à une base privée sans l'exposer.

> [!question]- Comment ça marche ?
> Durcissement SSH : authentification par clé uniquement (`PasswordAuthentication no`), pas de connexion root (`PermitRootLogin no`), fail2ban, fichier `~/.ssh/config` pour les alias.

> [!question]- Quand l'utiliser ?
> Administration de serveurs, VPS de projets, débogage de conteneurs.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Intervenir à la main sur des serveurs de production non documentés crée de la dérive : préférer l'automatisation (Ansible, IaC, CI).

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| SSH | Accès distant chiffré |
| Tunnel SSH | Redirection de port sécurisée |
| Interface | Carte réseau (physique ou virtuelle) |
| Table de routage | Règles d'acheminement |

---

## Points clés

- SSH par clé, pas de root
- Tunnel SSH pour accéder à une ressource privée
- `ss -tulpn` pour voir ce qui écoute

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Ouvrir le port de la BDD au lieu d'utiliser un tunnel

---

## Exemple minimal

```text
# ~/.ssh/config
Host cinetrack-prod
  HostName 203.0.113.5
  User deploy
  IdentityFile ~/.ssh/id_ed25519
# → ssh cinetrack-prod
```

> [!note] Ce que j'en retiens
> Un alias SSH évite de retaper IP, utilisateur et clé.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Automatiser la configuration serveur (Ansible, cloud-init)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Réseaux]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/net-12-linux-et-reseau]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - À quoi sert un tunnel SSH ?

---

## Tâches

- [ ] #task Accéder à la BDD du VPS via un tunnel SSH depuis DBeaver/IntelliJ
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
