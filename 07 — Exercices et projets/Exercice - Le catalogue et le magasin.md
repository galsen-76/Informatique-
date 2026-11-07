---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Gestionnaire de paquets]]"
tags:
  - exercice
---
# Exercice — Le catalogue et le magasin

> [!info] Avant de commencer
> **Notion travaillée :** [[Gestionnaire de paquets]]
> **À voir avant :** [[Permissions Linux]]
> **Objectif :** Comprendre le rôle du catalogue de paquets, et pourquoi l'ordre des opérations compte.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Sur une WSL toute neuve, tu tapes directement la commande pour installer `tree`, sans rien faire avant. Prédis le résultat.
- [ ] Fait
### 2. 💬 Expliquer
Explique la différence entre « mettre à jour le catalogue » et « mettre à jour les logiciels ». Laquelle installe vraiment quelque chose ?
- [ ] Fait
### 3. 🧩 Résoudre
Trouve : si `tree` est installé · quelle version le catalogue propose · quels fichiers le paquet a mis sur le disque.
- [ ] Fait
### 4. 🔮 Prédire
Dans un Dockerfile, quelqu'un écrit la mise à jour du catalogue dans un `RUN` et l'installation dans le `RUN` suivant. Ça marche aujourd'hui. Prédis ce qui peut arriver dans trois mois, au prochain build.
- [ ] Fait
### 5. 💬 Expliquer
Pourquoi installe-t-on les bibliothèques Python avec `pip` plutôt qu'avec le gestionnaire de paquets du système ?
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Le gestionnaire de paquets a une **liste locale** de ce qui existe (le catalogue). Sans liste à jour, il ne trouve rien. Installer = télécharger un paquet repéré dans cette liste.

> [!question]- Solution et raisonnement
> - `Unable to locate package tree` (ou une version introuvable) : le catalogue local est vide ou trop vieux.
> - `apt update` télécharge le catalogue (n'installe rien) ; `apt upgrade` remplace les logiciels installés par les nouvelles versions.
> - `apt list --installed | grep tree` ; `apt show tree` (ou `apt list -a tree`) ; `dpkg -L tree`.
> - Docker peut **réutiliser en cache** la couche du `update` (vieille liste) et relancer seulement l'`install` : le paquet a changé de version sur le serveur et l'installation échoue. D'où `update && install` dans le même `RUN`.
> - Le système propose une seule version, choisie par la distribution, et l'installe pour tout le système ; `pip` (dans un environnement virtuel) donne la version voulue, par projet.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
