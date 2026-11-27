---
type: concept
module: "[[Module 15 - Architecture logicielle]]"
related:
  - "[[Image Docker]]"
  - "[[Pipeline GitLab CI]]"
  - "[[Journaliser avec logging]]"
tags:
  - concept
  - architecture
---
# Application douze facteurs

> [!info] En une phrase
> La méthode des douze facteurs (twelve-factor app) est une liste de règles pour écrire une application facile à déployer, à configurer et à faire tourner en plusieurs copies, notamment dans Docker et le cloud.

## 1 · Comprendre
### Définition
Les facteurs les plus utiles au début :
1. **Une base de code** suivie dans Git, plusieurs déploiements (dev, test, prod)
2. **Dépendances déclarées** (`requirements.txt`, `package.json`), rien d'installé « à la main »
3. **Configuration dans l'environnement** : adresses, mots de passe, clés via des variables d'environnement, jamais dans le code
4. **Services externes comme ressources** : la base ou une API externe sont des adresses qu'on change par la configuration
5. **Construire, publier, exécuter** séparés (c'est ce que fait ta CI : image, registre, déploiement)
6. **Processus sans état** : ce qui doit durer va en base ou en stockage
9. **Démarrage rapide, arrêt propre**
10. **Dev et prod aussi proches que possible** (Docker aide)
11. **Logs sur la sortie standard**, c'est la plateforme qui les collecte

Les autres : ports exposés, mise à l'échelle par processus, tâches d'admin ponctuelles.

### Pourquoi ça existe
« Ça marche sur ma machine » : mot de passe en dur, fichier écrit sur le disque local, configuration différente partout, impossible de lancer deux copies.

### Le problème résolu
La même image Docker tourne partout, seule la configuration change ; on peut lancer, arrêter et multiplier les copies sans surprise.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
CO[Code] --> BU[Build image]
  BU --> RE[Release]
  CF[Config env] --> RE
  RE --> RU[Exécution]
```

### Exemple concret
```python
# ❌ configuration dans le code
API_URL = "http://192.168.1.20:8080"
MOT_DE_PASSE = "admin123"

# ✅ configuration dans l'environnement
import os
API_URL = os.environ["API_URL"]
MOT_DE_PASSE = os.environ["API_PASSWORD"]   # injecté par Docker ou la CI
logging.basicConfig(stream=sys.stdout)      # logs sur la sortie standard
```

### Cas d'utilisation
- Préparer une appli pour Docker
- Variables CI GitLab
- Déploiement sur plusieurs environnements

> [!warning] À ne pas confondre
> Ce n'est pas une norme à cocher à 100 % : ce sont des règles de bon sens. Le facteur le plus violé par les débutants est le 3 (secrets dans le code et dans Git).

## 3 · Relier
- **Prérequis** : [[Variable d'environnement]] · [[Docker]]
- **Complémentaires** : [[Image Docker]] · [[Pipeline GitLab CI]] · [[Journaliser avec logging]]
