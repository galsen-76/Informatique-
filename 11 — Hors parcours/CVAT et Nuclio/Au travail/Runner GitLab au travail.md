---
type: reference
tags:
  - travail
---
# Runner GitLab au travail

> [!info] D'où vient cette note
> Les passages propres à mon travail (CVAT, Nuclio, réseau de l'entreprise) sortis de la fiche neutre [[Runner GitLab]] le 19/11/2026.

## Cas d'utilisation au travail
- d'avoir des runners **spécialisés** (avec GPU, sous Windows, dans le réseau interne pour atteindre Nexus) ;

## Dans ton projet CVAT
- Les runners de l'entreprise sont probablement dans le **réseau interne** : c'est ce qui leur permet de joindre **Nexus**, que GitLab.com ne peut pas atteindre.
- Construire une image dans un job demande soit un runner `privileged` (docker-in-docker), soit **[[Kaniko]]**, qui n'a pas besoin de privilège : c'est pour ça qu'on l'utilise sur des runners partagés.
- Si un job reste **en attente** (*pending*) : aucun runner disponible n'accepte ses tags, ou tous sont occupés.

