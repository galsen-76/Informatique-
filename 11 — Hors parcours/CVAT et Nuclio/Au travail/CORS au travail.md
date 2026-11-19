---
type: reference
tags:
  - travail
---
# CORS au travail

> [!info] D'où vient cette note
> Les passages propres à mon travail (CVAT, Nuclio, réseau de l'entreprise) sortis de la fiche neutre [[CORS]] le 19/11/2026.

## Cas d'utilisation au travail
- Le bouton CVAT qui appelle ta fonction `convert-png`
- L'interface CVAT en mode dev (`localhost:3000`) qui parle au serveur (`localhost:8080`) : CVAT règle `CORS_ORIGIN_WHITELIST` avec `django-cors-headers`

## Exemple concret : une fonction Nuclio
Le bouton est dans la page CVAT (`localhost:8080`), la fonction écoute sur `localhost:32001` : autre origine. Le bouton envoie du JSON : preflight. Deux façons de répondre.

**1. À la main, dans le handler**, avec `context.Response(headers=…)` :
```python
CORS = {
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def handler(context, event):
    if event.method == "OPTIONS":                       # le preflight : on dit juste « oui »
        return context.Response(body="", headers=CORS, status_code=204)
    ...
    return context.Response(body=png, headers=CORS, content_type="image/png", status_code=200)
```
Les en-têtes doivent être sur **toutes** les réponses, y compris les erreurs (`400`, `500`). Sinon, le navigateur affiche une « erreur CORS » qui cache la vraie erreur.

**2. Par Nuclio, dans `function.yaml`** : le déclencheur HTTP sait gérer CORS tout seul.
```yaml
triggers:
  myHttpTrigger:
    kind: http
    attributes:
      cors:
        enabled: true
        allowOrigins: ["http://localhost:8080"]
```
Nuclio répond lui-même au preflight (ta fonction ne voit **plus jamais** de `OPTIONS`) et ajoute `Access-Control-Allow-Origin` aux réponses. Par défaut, il autorise toutes les origines et les en-têtes `Accept`, `Content-Length`, `Content-Type`, `Authorization`.

> [!warning] Piège de l'option 2
> Avec `cors.enabled`, Nuclio **refuse toute requête sans en-tête `Origin`** (vu dans son code). Le navigateur en envoie un pour tout appel venant d'une autre origine, mais curl et Python n'en envoient pas : pour tester à la main, ajoute `-H "Origin: http://localhost:8080"`. Choisis une seule des deux options : les mélanger rend difficile de savoir qui envoie quoi.

> [!tip] Lire une erreur CORS
> Dans les outils du navigateur, onglet **Réseau** : regarde d'abord s'il y a une ligne `OPTIONS` (preflight) et son statut, puis les en-têtes de réponse de la vraie requête. curl ne voit jamais d'erreur CORS : si curl marche et le navigateur non, c'est presque toujours un en-tête manquant.

