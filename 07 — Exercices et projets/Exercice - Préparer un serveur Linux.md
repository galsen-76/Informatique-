---
type: exercise
status: a-faire
difficulty: difficile
concepts:
  - "[[Utilisateur et groupe]]"
  - "[[SSH]]"
  - "[[Pare-feu]]"
tags:
  - exercice
---
# Exercice — Préparer un serveur Linux

> [!info] Objectif
> Appliquer les premiers gestes d'administration sur une machine Linux de test.
> Notions : [[Utilisateur et groupe]] · [[SSH]] · [[Pare-feu]] · [[Gestionnaire de paquets]]

## Consignes
- [ ] Sur une VM ou une distribution WSL de test, mets le système à jour
- [ ] Crée un utilisateur `deploy`, donne-lui `sudo`, installe-lui une clé SSH
- [ ] Interdis la connexion root et par mot de passe dans la configuration SSH, en gardant une session ouverte pendant le test
- [ ] Active `ufw` avec seulement 22, 80 et 443 ouverts
- [ ] Installe Docker et ajoute `deploy` au groupe `docker` ; vérifie qu'il peut lancer `docker ps` après reconnexion
- [ ] Relève la place disque, la mémoire libre et les 5 processus qui consomment le plus

> [!question]- Indice
> `adduser`, `usermod -aG sudo,docker deploy`, `/etc/ssh/sshd_config`, `sudo systemctl restart ssh`, `ufw allow`, `df -h`, `free -h`, `ps aux --sort=-%mem | head`.

> [!question]- Solution
> ```bash
> sudo apt update && sudo apt upgrade -y
> sudo adduser deploy && sudo usermod -aG sudo deploy
> sudo mkdir -p /home/deploy/.ssh && sudo cp ~/.ssh/id_ed25519.pub /home/deploy/.ssh/authorized_keys
> sudo chown -R deploy:deploy /home/deploy/.ssh && sudo chmod 700 /home/deploy/.ssh && sudo chmod 600 /home/deploy/.ssh/authorized_keys
> sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/; s/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
> sudo systemctl restart ssh        # tester dans un AUTRE terminal : ssh deploy@hôte
> sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw enable
> sudo usermod -aG docker deploy
> df -h ; free -h ; ps aux --sort=-%mem | head -6
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
