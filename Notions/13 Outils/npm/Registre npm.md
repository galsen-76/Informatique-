---
type: notion
statut: a apprendre
resume: "Le registre est le serveur d'où npm télécharge les paquets ; le fichier .npmrc dit à npm quel registre utiliser (et comment s'y connecter)."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Le registre est le **serveur d'où npm télécharge les paquets** ; le fichier `.npmrc` dit à npm **quel registre utiliser** (et comment s'y connecter).

## ❓ Le problème

**Pourquoi ça existe ?**
Parce qu'en entreprise, on n'a souvent pas le droit d'aller sur le registre public : on passe par un miroir interne (Nexus, Artifactory) qui contrôle ce qui entre.

**Qu'est-ce qui se passait sans ça ?**
Chaque poste allait sur Internet chercher n'importe quel paquet : impossible de filtrer les paquets dangereux, et tout cassait quand Internet était bloqué.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Par défaut, npm va sur `https://registry.npmjs.org`. Un fichier `.npmrc` change ça :

```ini
registry=https://nexus.mon-entreprise.com/repository/npm-group/
```

npm lit les `.npmrc` dans cet ordre (le premier gagne) :
1. celui **du projet** (à côté du `package.json`) ;
2. celui **de l'utilisateur** (`~/.npmrc`) ;
3. le global.

Pour vérifier lequel est utilisé :

```bash
npm config get registry
```

Si le miroir demande une authentification, on met une **variable**, pas le vrai jeton :

```ini
//nexus.mon-entreprise.com/repository/npm-group/:_authToken=${NPM_TOKEN}
```

## ⚠️ Limites et pièges

- **Le `.npmrc` doit être dans le dossier où tu lances npm** (ou dans ton dossier utilisateur), sinon il n'est pas lu.
- **Jamais de jeton en clair dans un `.npmrc` versionné** : utiliser `${NPM_TOKEN}` et une variable CI masquée.
- **Erreur de certificat** (`UNABLE_TO_GET_ISSUER_CERT_LOCALLY`) derrière le miroir : il manque le certificat de l'entreprise. Ne pas désactiver la vérification (`strict-ssl=false`) : voir [[Certificat et HTTPS]].
- **En CI, le runner n'a pas ton `~/.npmrc`** : il faut un `.npmrc` dans le projet ou le créer dans le job.

## 🔗 Liens

- **Prérequis :** [[npm]], [[Proxy]]
- **Voir aussi :** [[Certificat et HTTPS]], [[Pare-feu]]
- **Utilisé dans :** les postes et la CI de l'entreprise

## 📚 Notes

- 
