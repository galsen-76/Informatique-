---
type: notion
statut: a apprendre
resume: "Le DNS est l'annuaire d'Internet : il traduit un nom (gitlab.mon-entreprise.com) en adresse IP."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Le DNS est l'**annuaire d'Internet** : il traduit un nom (`gitlab.mon-entreprise.com`) en adresse IP.

## ❓ Le problème

**Pourquoi ça existe ?**
Parce que les humains retiennent des noms, mais les machines ont besoin d'adresses IP. Et l'IP peut changer sans que le nom change.

**Qu'est-ce qui se passait sans ça ?**
Il fallait connaître et retenir l'adresse IP de chaque serveur, et tout mettre à jour quand un serveur changeait d'adresse.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Quand tu tapes un nom, avant toute connexion, ta machine demande à un **serveur DNS** : « Quelle est l'IP de `playwright.dev` ? ». Il répond, et c'est seulement ensuite que la connexion part vers cette IP.

```bash
nslookup gitlab.mon-entreprise.com   # quelle IP pour ce nom ?
```

- En entreprise, le DNS interne connaît des noms qui n'existent pas sur Internet (`*.service.consul`, `recette.intra`).
- Le fichier `/etc/hosts` (Windows : `C:\Windows\System32\drivers\etc\hosts`) permet de forcer un nom vers une IP sur ta machine.
- Docker a son propre DNS : sur un même réseau, les conteneurs se trouvent par leur nom.

## ⚠️ Limites et pièges

- **`ENOTFOUND` / `getaddrinfo` / *Could not resolve host*** : c'est un problème de **nom**, pas de pare-feu. La machine ne sait pas quelle IP utiliser.
- **Un nom interne n'est pas résolu depuis l'extérieur** : un runner hors du réseau de l'entreprise ne trouvera pas `recette.intra`.
- **Le cache DNS** peut garder une ancienne IP quelques minutes après un changement.

## 🔗 Liens

- **Prérequis :** [[Adresse IP]]
- **Voir aussi :** [[HTTP]], [[Ports et réseau Docker]]
- **Utilisé dans :** chaque requête vers un nom de domaine (GitLab, registre npm, appli testée)

## 📚 Notes

- 
