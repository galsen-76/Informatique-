---
type: concept
domain: architecture
module: "[[Module 15 - Architecture logicielle]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Séparation des responsabilités]]"
parents:
  - "[[Séparation des responsabilités]]"
related:
  - "[[Architecture en couches]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# MVC

> [!info] En une phrase
> MVC (Modèle, Vue, Contrôleur) sépare les données et leurs règles (modèle), l'affichage (vue) et ce qui reçoit les actions et relie les deux (contrôleur).

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
- **Modèle** : les données et les règles (une tâche, sa validation, son enregistrement).
- **Vue** : ce que voit l'utilisateur (une page HTML, du JSON).
- **Contrôleur** : reçoit la requête, demande au modèle, choisit la vue.
Présent dans beaucoup de frameworks serveur : **Django** (qui l'appelle MTV : modèle, template, vue), Ruby on Rails, Laravel, Spring MVC, ASP.NET MVC.
Côté front, des variantes : **MVVM** (Vue, Angular : la vue est liée à un *ViewModel*), et l'approche composants de React.

### Pourquoi ça existe
Un vocabulaire commun pour dire où va chaque morceau de code dans une application avec interface.

### Le problème résolu
Ne pas mélanger HTML, SQL et logique dans le même fichier.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Utilisateur] --> C[Contrôleur]
  C --> M[Modèle]
  M --> C
  C --> V[Vue]
  V --> U
```

### Exemple concret
```python
# Django (CVAT est écrit ainsi)
# models.py : le modèle
class Tache(models.Model):
    nom = models.CharField(max_length=100)
# views.py : le « contrôleur » au sens MVC
def liste(request):
    return render(request, "taches/liste.html", {"taches": Tache.objects.all()})
# templates/taches/liste.html : la vue
# {% for t in taches %}<li>{{ t.nom }}</li>{% endfor %}
```

### Cas d'utilisation
- Comprendre l'organisation de Django et donc de CVAT
- Frameworks web serveur

> [!warning] À ne pas confondre
> Le mot **vue** n'a pas le même sens partout : dans Django, la *view* est le contrôleur ; dans MVC, la vue est l'affichage. Regarde le rôle, pas le nom.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🧠 Dessine de mémoire
> Dessine le Modèle, la Vue et le Contrôleur, et la flèche que suit un clic sur « Supprimer » jusqu'au nouvel affichage.

> [!example] 🔄 Change de contexte
> Redessine-le pour MesDépenses (API + front Vue). Où est chaque lettre ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - MVC » et je l'intègre ici avec `![[Schéma - MVC.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Séparation des responsabilités]]
- **Complémentaires** : [[Architecture en couches]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
