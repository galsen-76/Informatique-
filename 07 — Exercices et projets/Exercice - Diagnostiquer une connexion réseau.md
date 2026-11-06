---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Adresse IP]]"
  - "[[DNS]]"
  - "[[Routage et NAT]]"
  - "[[TCP et UDP]]"
  - "[[Port]]"
tags:
  - exercice
---
# Exercice — Diagnostiquer une connexion réseau

> [!info] Objectif
> Suivre une méthode pas à pas pour trouver pourquoi « ça ne répond pas ».
> Notions : [[Adresse IP]] · [[DNS]] · [[Routage et NAT]] · [[TCP et UDP]] · [[Port]]

## Consignes
- [ ] Note ton IP, ta passerelle et ton résolveur DNS, sous Windows et sous WSL
- [ ] Résous `gitlab.com` et un nom qui n'existe pas : compare les réponses
- [ ] Trace le chemin vers `gitlab.com`
- [ ] Lance `python3 -m http.server 8000` dans WSL ; vérifie qu'il écoute avec `ss`, puis teste depuis PowerShell avec `Test-NetConnection localhost -Port 8000` et le navigateur
- [ ] Arrête le serveur et reteste : quel message ? Teste un port sur une IP qui n'existe pas dans ton réseau : quel message ?
- [ ] Écris dans tes mots les 5 étapes de diagnostic, dans l'ordre

> [!question]- Indice
> `ip addr`, `ip route`, `cat /etc/resolv.conf`, `ipconfig /all`, `nslookup`, `traceroute`/`tracert`. Rien qui écoute = refused ; rien qui répond = timeout.

> [!question]- Solution
> ```bash
> ip addr ; ip route ; cat /etc/resolv.conf
> nslookup gitlab.com ; nslookup nexistepas.example
> traceroute gitlab.com
> python3 -m http.server 8000 &
> ss -tlnp | grep 8000
> ```
> ```powershell
> ipconfig /all
> Test-NetConnection localhost -Port 8000      # TcpTestSucceeded : True
> Test-NetConnection 192.168.1.250 -Port 80    # délai : rien ne répond
> ```
> Étapes : IP et passerelle → DNS → chemin → port → service.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
