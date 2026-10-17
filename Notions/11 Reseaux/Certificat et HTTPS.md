---
type: notion
statut: a apprendre
resume: "Un certificat est une carte d'identité numérique du serveur : il prouve que tu parles au bon site et permet de chiffrer la connexion (HTTPS)."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** Un certificat est une **carte d'identité numérique du serveur** : il prouve que tu parles au bon site et permet de chiffrer la connexion (HTTPS).

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que personne ne puisse lire ou modifier ce qui passe entre toi et le serveur, et pour être sûr que le serveur n'est pas un imposteur.

**Qu'est-ce qui se passait sans ça ?**
En HTTP simple, n'importe qui sur le réseau (Wi-Fi public, proxy) pouvait lire les mots de passe ou se faire passer pour le site.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Quand tu te connectes en HTTPS :

1. Le serveur présente son **certificat** : « Je suis `gitlab.mon-entreprise.com`, et voici la signature de l'autorité qui le garantit ».
2. Ta machine vérifie la signature avec la liste des **autorités de confiance** (CA) qu'elle connaît.
3. Si c'est bon, une clé de chiffrement est négociée (**TLS**) et tout l'échange est chiffré.

**En entreprise**, le proxy ouvre souvent les connexions HTTPS pour les inspecter, puis les signe avec le **certificat de l'entreprise**. Les postes de l'entreprise connaissent ce certificat ; un conteneur Docker ou un outil comme Node, non.

Symptômes : `self signed certificate in certificate chain`, `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`, `unable to verify the first certificate`.

Solution propre : ajouter le certificat de l'entreprise à la confiance de l'outil :

```bash
export NODE_EXTRA_CA_CERTS=/chemin/ca-entreprise.pem   # pour Node / npm / Playwright
```

## ⚠️ Limites et pièges

- **Ne jamais désactiver la vérification** (`strict-ssl=false`, `NODE_TLS_REJECT_UNAUTHORIZED=0`) : ça enlève toute la sécurité.
- **Un certificat expire** : un site qui marchait hier peut afficher une erreur aujourd'hui.
- **Le nom doit correspondre** : un certificat pour `site.fr` n'est pas valable pour `www.site.fr` (sauf s'il est prévu pour les deux).
- **Demander le certificat de l'entreprise à l'équipe infra/sécurité**, ne pas le récupérer n'importe comment.

## 🔗 Liens

- **Prérequis :** [[HTTP]]
- **Voir aussi :** [[Proxy]], [[Notions/13 Outils/npm/Registre npm]]
- **Utilisé dans :** npm derrière le miroir, les images Docker en entreprise, les tests sur la recette en HTTPS

## 📚 Notes

- 
