---
type: concept
domain: architecture
module: "[[Module 22 - Design patterns]]"
status: a-decouvrir
level: intermediaire
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Interface et polymorphisme]]"
parents:
  - "[[Design pattern]]"
related:
  - "[[Pile et file]]"
  - "[[Architecture événementielle]]"
next_review: 
method: []
tags:
  - concept
  - architecture
---
# Patron Commande (Command)

> [!info] En une phrase
> La commande transforme une action en objet : on peut alors la mettre en file d'attente, la journaliser, la rejouer ou l'annuler.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**Famille :** comportemental

**Le problème typique :** des actions doivent être exécutées plus tard, ailleurs, en série, ou annulées (Ctrl+Z).

**L'idée :** un objet qui contient tout ce qu'il faut pour exécuter l'action (`executer()`), et éventuellement pour l'annuler (`annuler()`).

### Pourquoi ça existe
Sans ce patron : l'action n'existe que comme un appel de fonction immédiat : impossible de la stocker, de la transmettre ou de la défaire.

### Quand l'utiliser
**Quand l'utiliser :** une action doit être différée, mise en file, tracée ou annulable.

**Quand ne pas l'utiliser :** une action simple, immédiate et définitive.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
U[Interface] --> C[Objet commande]
  C --> F[File ou historique]
  F --> X[executer]
  F --> Z[annuler]
```

### Exemple concret
```python
@dataclass
class RenommerTache:
    depot: DepotTaches
    tache_id: int
    nouveau: str
    ancien: str = ""
    def executer(self):
        t = self.depot.trouver(self.tache_id)
        self.ancien, t.nom = t.nom, self.nouveau
        self.depot.enregistrer(t)
    def annuler(self):
        t = self.depot.trouver(self.tache_id)
        t.nom = self.ancien
        self.depot.enregistrer(t)

historique = []
cmd = RenommerTache(depot, 12, "Chantier nord"); cmd.executer(); historique.append(cmd)
historique.pop().annuler()          # Ctrl+Z
```
Au niveau système, c'est l'idée des **files de tâches** : une demande d'export devient un message (une commande sérialisée en JSON) placé dans Redis, qu'un worker exécute plus tard. CVAT fonctionne ainsi pour ses traitements longs.

### Cas d'utilisation
- Annuler et refaire
- Files de tâches (Redis, RQ, Celery)
- Journal des actions, rejouer des opérations
- Les migrations de base de données (chacune a son `up` et son `down`)

> [!warning] À ne pas confondre
> Une commande qui ne garde pas assez d'informations pour s'annuler (ici `ancien`) : l'annulation devient impossible ou fausse.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine trois actions de ton application (ajouter, supprimer, modifier) transformées en objets rangés dans un historique, avec un bouton Annuler.

> [!example] 🔄 Change de contexte
> Redessine la même idée pour une file de tâches longues (des exports lourds). Pourquoi l'action doit-elle être un objet ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Patron Commande (Command) » et je l'intègre ici avec `![[Schéma - Patron Commande (Command).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Interface et polymorphisme]]
- **Complémentaires** : [[Pile et file]] · [[Architecture événementielle]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
