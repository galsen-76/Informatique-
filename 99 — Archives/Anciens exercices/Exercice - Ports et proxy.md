---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Port]]"
  - "[[Proxy]]"
tags:
  - exercice
---
# Exercice — Ports et proxy

> [!info] Objectif
> Publier un service sur un port, provoquer un conflit, et repérer la configuration de proxy.
> Notions : [[Port]] · [[Proxy]]

## Consignes
- [ ] Lance `docker run -d --name web -p 8080:80 nginx` et ouvre `http://localhost:8080`
- [ ] Lance un second conteneur sur le même port de la machine et lis l'erreur
- [ ] Corrige en changeant le bon côté de `-p`
- [ ] Affiche les variables de proxy définies dans ton terminal WSL et dans PowerShell
- [ ] Explique à quoi servirait `NO_PROXY` pour l'adresse du Nexus

> [!question]- Indice
> Le côté gauche de `-p` est ta machine. Pour les variables : `env | grep -i proxy` en Bash, `Get-ChildItem env: | Where-Object Name -like "*proxy*"` en PowerShell.

> [!question]- Solution
> ```bash
> docker run -d --name web2 -p 8080:80 nginx   # erreur : port is already allocated
> docker run -d --name web2 -p 8081:80 nginx   # OK : http://localhost:8081
> env | grep -i proxy
> docker rm -f web web2
> ```
> `NO_PROXY` liste les adresses internes (Nexus) à joindre sans passer par le proxy, qui les refuserait.

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
