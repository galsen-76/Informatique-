---
type: howto
concepts:
  - "[[Serverless et FaaS]]"
tags:
  - fiche-pratique
  - python
  - nuclio
---
# Fiche - Nuclio, le SDK Python

> [!info] En bref
> Avec le SDK, ma fonction Nuclio se comporte comme une API : `event` = la requête reçue, `context.Response` = la réponse renvoyée.

## Mini exemple
```python
def handler(context, event):
    nom = event.body.get("nom", "inconnu")      # lire la requête
    return context.Response(                    # renvoyer la réponse
        body={"message": f"Bonjour {nom}"},
        content_type="application/json",
        status_code=200,
    )
```
Appel : `curl -X POST -H "Content-Type: application/json" -d '{"nom": "Oumar"}' http://localhost:32001`
Réponse : `{"message": "Bonjour Oumar"}`

## Lire la requête (`event`)
| Utile | Contenu |
| --- | --- |
| `event.body` | le corps : un `dict` si `Content-Type: application/json`, sinon des `bytes` |
| `event.method` | `"GET"`, `"POST"`, `"OPTIONS"`… |
| `event.headers` | les en-têtes |
| `event.fields` | les paramètres de l'URL (`?id=3` → `{"id": "3"}`) |

## Renvoyer la réponse (`context.Response`)
| Paramètre | Rôle | Exemple |
| --- | --- | --- |
| `body` | le contenu | `{"ok": True}`, `"texte"`, des `bytes` (image) |
| `content_type` | le type du contenu | `"application/json"`, `"image/png"` |
| `status_code` | le code HTTP | `200`, `400`, `500` |
| `headers` | des en-têtes en plus | en-têtes CORS |

## Avec mes mots
> [!quote] Mon résumé, avec mes mots
>

## Liens
[[Serverless et FaaS]] · [[Envoyer et recevoir un fichier en HTTP]]
