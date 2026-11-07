---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Volume Docker]]"
tags:
  - exercice
---
# Exercice — Ce qui survit au conteneur

> [!info] Avant de commencer
> **Notion travaillée :** [[Volume Docker]]
> **À voir avant :** [[Conteneur]]
> **Objectif :** Comprendre comment garder ou partager des données avec un conteneur, et la différence entre un dossier monté et un volume.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Tu lances un conteneur en lui partageant ton dossier courant, et dedans tu crées `sortie.txt`. Prédis : le fichier apparaît-il sur ta machine ? Et s'il s'arrête et est supprimé ?
- [ ] Fait
### 2. 🧪 Vérifier
Fais-le (cherche l'option qui relie un dossier de ta machine à un dossier du conteneur). Puis l'inverse : modifie un fichier sur ta machine et lis-le dans le conteneur.
- [ ] Fait
### 3. 🧩 Résoudre
Crée un **volume nommé**, écris dedans depuis un premier conteneur, lis-le depuis un second. Où est-il stocké ?
- [ ] Fait
### 4. 🔧 Réparer
Ton script dans le conteneur écrit `archive.zip` dans `/app`, mais tu ne le retrouves jamais sur ta machine. Explique pourquoi, et corrige la commande.
- [ ] Fait
### 5. 💬 Expliquer
Quand choisir un dossier monté (`-v ./dossier:/data`) et quand un volume nommé ? Donne un exemple pour chaque.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Un dossier monté = **ton** dossier, visible dans le conteneur (pratique pour le développement). Un volume nommé = un stockage géré par Docker, qui survit aux conteneurs (pratique pour une base de données).

> [!question]- Solution et raisonnement
> - Oui, il apparaît tout de suite chez toi, et reste après la suppression du conteneur : c'est **ton** dossier.
> - `docker run --rm -it -v "$PWD":/data alpine sh` ; ce que tu changes d'un côté se voit de l'autre.
> - `docker volume create donnees`, puis `-v donnees:/data` dans deux conteneurs ; il est rangé par Docker (`docker volume inspect donnees`).
> - `/app` est dans la couche du conteneur, qui disparaît. Monter un dossier sur l'endroit où le script écrit : `-v "$PWD/sortie":/app/sortie`.
> - Monté : ton code ou tes fichiers d'entrée et de sortie. Volume nommé : les données d'une base comme PostgreSQL.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
