---
type: notion
statut: a apprendre
resume: "La sécurité, c'est protéger les données et les utilisateurs de ton application."
revu:
sources:
  - "https://cheatsheetseries.owasp.org/"
---
# Fondamentaux de la sécurité

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : La sécurité, c'est protéger les **données** et les **utilisateurs** de ton application.

## Le problème

**Pourquoi c'est utile ?**
Pour protéger les données et les utilisateurs avec quelques principes simples.

**Qu'est-ce qui se passait sans ça ?**
On faisait confiance à tout ce qui venait du client, et la moindre faille exposait toute la base.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pas besoin d'être expert : quelques principes simples, appliqués systématiquement, évitent l'immense majorité des failles. Le premier : **ne jamais faire confiance à ce qui vient du client**.

### Les 3 objectifs (CIA)

| Objectif | Question | Exemple d'attaque |
|---|---|---|
| **Confidentialité** | seules les bonnes personnes voient les données ? | lire les favoris d'un autre utilisateur |
| **Intégrité** | les données ne sont pas modifiées sans droit ? | modifier la critique de quelqu'un d'autre |
| **Disponibilité** | le service reste accessible ? | saturer l'API de requêtes |

### Les 7 principes à appliquer partout

1. **Ne jamais faire confiance au client.** Le front peut être modifié, les requêtes forgées avec Postman. Tout est **revérifié côté serveur** : données (DTO), identité (jeton), droits.
2. **Le moindre privilège.** Chacun a seulement les droits nécessaires : l'utilisateur de la base n'est pas administrateur, un compte « lecteur » ne peut pas supprimer.
3. **Défense en profondeur.** Plusieurs protections successives : validation dans l'API **et** contraintes en base **et** pare-feu. Si l'une échoue, les autres tiennent.
4. **Sécurisé par défaut.** Toutes les routes protégées, sauf celles explicitement publiques.
5. **Pas de secrets dans le code.** Variables d'environnement (voir [[Gestion des secrets|Secrets]]).
6. **Des dépendances à jour.** La plupart des failles viennent de librairies anciennes (`npm audit`).
7. **Des erreurs discrètes.** Le client reçoit « Erreur interne », les détails vont dans les logs.

### La carte des sujets

| Sujet | Note |
|---|---|
| Les 10 risques les plus courants | OWASP Top 10 |
| Qui est l'utilisateur ? | Authentification |
| A-t-il le droit ? | Autorisation |
| Mots de passe | Hachage |
| Scripts injectés, requêtes forcées | XSS et CSRF |
| Appels entre domaines | CORS |
| Injections dans la base | Injection SQL |
| Chiffrement des échanges | HTTPS |

## 🧪 Exemple

### Front ou back : qui protège quoi ?

```mermaid
flowchart LR
  F["🖥️ Front<br/>aide l'utilisateur<br/>(cache un bouton, valide un champ)"] -->|"requête"| B["⚙️ Back<br/>DÉCIDE<br/>(vérifie jeton, droits, données)"]
  B --> DB[("🗄️ Base<br/>contraintes = dernier rempart")]
```

**Cacher un bouton « Supprimer » ne protège rien** : n'importe qui peut envoyer `DELETE /reviews/7` directement. C'est le back qui doit vérifier que la critique appartient à l'utilisateur.

## ⚠️ Limites et pièges

- **« Personne ne va attaquer mon petit projet »** : des robots scannent Internet en continu, sans distinction.
- **Sécurité seulement côté front** : elle se contourne en quelques secondes.

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://cheatsheetseries.owasp.org/
