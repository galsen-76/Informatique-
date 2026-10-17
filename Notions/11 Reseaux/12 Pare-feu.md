---
type: notion
statut: a apprendre
resume: "Un pare-feu est un filtre qui laisse passer ou bloque les connexions selon des règles : qui (source), vers où (destination), sur quel port."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un pare-feu est un **filtre** qui laisse passer ou bloque les connexions selon des règles : qui (source), vers où (destination), sur quel port.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour protéger les machines : n'autoriser que les connexions prévues et bloquer tout le reste.

**Qu'est-ce qui se passait sans ça ?**
Toutes les machines étaient joignables par tout le monde : une seule machine infectée pouvait attaquer toutes les autres.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Une règle ressemble à : « la machine **A** a le droit d'aller vers **B** sur le port **443** ». Tout ce qui n'est pas autorisé est bloqué.

Pourquoi « ça marche sur mon poste mais pas en CI » ? Les règles dépendent de la **source** : ton poste a des autorisations que le runner n'a pas (ou l'inverse). Le runner est une autre machine, dans une autre zone du réseau.

Lire les erreurs pour savoir qui bloque :

| Message | Ce que ça veut dire |
|---|---|
| *Connection timed out* | la demande part et **personne ne répond** → souvent un pare-feu qui jette en silence |
| *Connection refused* | la machine répond « non » → rien n'écoute sur ce port (ou rejet explicite) |
| *Could not resolve host* | problème de **[[06 DNS|DNS]]**, pas de pare-feu |
| *407 Proxy Authentication Required* | il faut s'authentifier au **[[13 Proxy|Proxy]]** |
| erreur de certificat | voir [[10 Certificat et HTTPS|Certificat et HTTPS]] |

```bash
curl -I --max-time 10 https://registry.npmjs.org   # tester depuis la machine concernée
```

## ⚠️ Limites et pièges

- **Toujours tester depuis la machine qui pose problème** (dans le job CI, pas sur ton poste).
- **Les connexions sortantes sont souvent permises, les entrantes bloquées** : d'où les runners et agents qui vont chercher le travail eux-mêmes.
- **Ouvrir un flux se demande à l'équipe réseau/sécurité** avec la source, la destination et le port précis.

## 🔗 Liens

- **Prérequis :** [[03 Adresse IP|Adresse IP]], [[04 Port|Port]]
- **Voir aussi :** [[13 Proxy|Proxy]], [[03 Runner GitLab|Runner GitLab]]
- **Utilisé dans :** le diagnostic des timeouts en CI (`apt-get`, `npm ci`, tests)

## 📚 Notes

- 
