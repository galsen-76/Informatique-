---
type: exercise
status: a-faire
niveau: 4
difficulty: moyen
concepts:
  - "[[SSH]]"
  - "[[Clé SSH]]"
  - "[[Utilisateur et groupe]]"
  - "[[Permissions Linux]]"
  - "[[Service (systemd)]]"
  - "[[Journaux système]]"
  - "[[Pare-feu]]"
tags:
  - exercice
  - mini-projet
---
# MesDépenses 11 - Installer l'API sur un serveur

> [!info] Où tu en es
> **Projet :** [[Projet - MesDépenses]] · **Niveau :** 4 · **Étape précédente :** [[MesDépenses 10 - Sortir une version]]
> **Notions :** [[SSH]] · [[Clé SSH]] · [[Utilisateur et groupe]] · [[Permissions Linux]] · [[Service (systemd)]] · [[Journaux système]] · [[Pare-feu]]

## Le but
Mettre l'API sur une vraie machine Linux, s'y connecter proprement et la faire redémarrer toute seule. Au travail, c'est le passage du « ça marche chez moi » au serveur.

> [!tip] Au travail
> Se connecter en SSH, lire les journaux et vérifier qu'un service redémarre, ce sont les trois gestes de base sur n'importe quel serveur de l'entreprise.

## Ce que tu fais
- [ ] Prends un serveur Linux : une machine virtuelle, une deuxième distribution WSL, ou un serveur de test qu'on te prête
- [ ] Connecte-toi par SSH avec une clé, puis interdis la connexion par mot de passe
- [ ] Crée un utilisateur dédié à l'application, qui n'a pas les droits d'administrateur
- [ ] Lance la version de l'étape 10 avec compose depuis le registre (pas de build sur le serveur)
- [ ] Redémarre le serveur : l'application doit revenir toute seule
- [ ] Retrouve dans les journaux du système l'heure du dernier démarrage de Docker et ce qu'a écrit l'API
- [ ] N'ouvre que les ports nécessaires

> [!warning] Les pièges
> - Ne coupe pas la connexion par mot de passe avant d'avoir vérifié que la clé marche, sinon tu t'enfermes dehors.
> - Une image construite sur le serveur n'est pas celle que la CI a testée.

> [!success] Ça marche si…
> Après un redémarrage du serveur, `curl` sur l'API répond, la connexion SSH par mot de passe est refusée, et l'application tourne sous son propre utilisateur.

> [!quote] Mes notes
> _Ce que j'ai compris, ce qui a coincé._

> [!question]- Indice
> `ssh-keygen`, `ssh-copy-id`, `PasswordAuthentication no`, `restart: unless-stopped` dans compose, `systemctl status docker`, `journalctl -u docker`.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] Claude a relu mes réglages SSH et mon compose de serveur
