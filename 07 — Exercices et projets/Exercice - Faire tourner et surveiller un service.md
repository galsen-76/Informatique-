---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Service (systemd)]]"
  - "[[Journaux système]]"
  - "[[Tâche planifiée (cron)]]"
tags:
  - exercice
---
# Exercice — Faire tourner et surveiller un service

> [!info] Objectif
> Faire de ton script un service et une tâche planifiée, et savoir lire leurs journaux.
> Notions : [[Service (systemd)]] · [[Journaux système]] · [[Tâche planifiée (cron)]]

## Consignes
- [ ] Active systemd dans WSL si `systemctl` ne répond pas (puis `wsl --shutdown` et relance)
- [ ] Installe `nginx`, affiche son état, arrête-le, redémarre-le, active-le au démarrage
- [ ] Casse volontairement sa configuration, essaie de le redémarrer et retrouve l'erreur avec `journalctl`
- [ ] Écris un fichier `.service` qui lance un petit script Python en boucle (qui journalise toutes les 10 secondes), démarre-le et suis ses logs
- [ ] Planifie avec cron ton script de zip toutes les 5 minutes, sortie redirigée dans un fichier ; vérifie puis supprime la tâche

> [!question]- Indice
> `/etc/wsl.conf` : `[boot]` puis `systemd=true`. `sudo nginx -t` teste la configuration. Après un nouveau `.service` : `sudo systemctl daemon-reload`.

> [!question]- Solution
> ```bash
> sudo apt install -y nginx
> systemctl status nginx ; sudo systemctl stop nginx ; sudo systemctl enable --now nginx
> echo "faux" | sudo tee -a /etc/nginx/nginx.conf ; sudo systemctl restart nginx
> journalctl -u nginx -n 20      # unknown directive "faux"
> sudo sed -i '$ d' /etc/nginx/nginx.conf && sudo systemctl restart nginx
> sudo tee /etc/systemd/system/battement.service >/dev/null <<'FIN'
> [Service]
> ExecStart=/usr/bin/python3 -u -c "import time,logging; logging.basicConfig(level='INFO')\nwhile True: logging.info('vivant'); time.sleep(10)"
> Restart=on-failure
> [Install]
> WantedBy=multi-user.target
> FIN
> sudo systemctl daemon-reload && sudo systemctl start battement && journalctl -u battement -f
> crontab -e   # */5 * * * * /usr/bin/python3 /home/oumar/projets/essai-zip/zipper.py /home/oumar/labo >> /home/oumar/zip.log 2>&1
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
