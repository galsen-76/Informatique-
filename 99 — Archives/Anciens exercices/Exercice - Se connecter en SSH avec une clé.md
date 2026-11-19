---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[SSH]]"
  - "[[Clé SSH]]"
  - "[[Pare-feu]]"
tags:
  - exercice
---
# Exercice — Se connecter en SSH avec une clé

> [!info] Objectif
> Mettre en place une connexion SSH par clé, de bout en bout.
> Notions : [[SSH]] · [[Clé SSH]] · [[Pare-feu]]

## Consignes
- [ ] Installe un serveur SSH dans WSL (ou utilise un serveur de test fourni par l'équipe) et vérifie qu'il écoute sur le port 22
- [ ] Connecte-toi par mot de passe et note le message d'empreinte
- [ ] Crée une clé ed25519, installe-la sur le serveur, reconnecte-toi sans mot de passe
- [ ] Crée une entrée dans `~/.ssh/config` pour te connecter avec un nom court
- [ ] Copie un fichier avec `scp` et lance une commande à distance sans ouvrir de session
- [ ] Ajoute ta clé publique à GitLab et clone un dépôt en SSH
- [ ] Si `ufw` est actif, explique quelle règle permet SSH

> [!question]- Indice
> Dans WSL : `sudo apt install openssh-server` puis `sudo service ssh start`. `ssh-copy-id`, `scp`, `ssh hôte "commande"`, `ssh -T git@gitlab.com`.

> [!question]- Solution
> ```bash
> sudo apt install -y openssh-server && sudo service ssh start && ss -tlnp | grep :22
> ssh $USER@localhost                       # empreinte, puis mot de passe
> ssh-keygen -t ed25519 -C "oumar@poste"
> ssh-copy-id $USER@localhost && ssh $USER@localhost     # plus de mot de passe
> cat >> ~/.ssh/config <<'FIN'
> Host labo
>     HostName localhost
>     User oumar
> FIN
> ssh labo "uname -a" ; scp fichier.txt labo:/tmp/
> cat ~/.ssh/id_ed25519.pub   # à coller dans GitLab
> ssh -T git@gitlab.com
> sudo ufw allow 22/tcp
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
