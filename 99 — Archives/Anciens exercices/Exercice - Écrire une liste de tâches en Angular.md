---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Angular]]"
  - "[[Angular CLI]]"
  - "[[Composant Angular]]"
  - "[[Template et liaison de données Angular]]"
tags:
  - exercice
---
# Exercice — Écrire une liste de tâches en Angular

> [!info] Objectif
> Refaire la liste de tâches en Angular pour voir sa structure et ses conventions.
> Notions : [[Angular]] · [[Angular CLI]] · [[Composant Angular]] · [[Template et liaison de données Angular]]

## Consignes
- [ ] Crée un projet avec `ng new taches` et lance `ng serve`
- [ ] Génère avec le CLI les composants `liste-taches` et `tache-item`
- [ ] `tache-item` a une entrée `tache` et deux sorties `basculer` et `supprimer`
- [ ] `liste-taches` contient un formulaire d'ajout avec `[(ngModel)]` (importe `FormsModule`), `@for` avec `track`, `@empty`
- [ ] Affiche le nombre de tâches restantes avec un `computed` (signals) et la date du jour avec le pipe `date`
- [ ] Lance `ng test` et lis le test généré pour un composant
- [ ] Lance `ng build` et regarde `dist/`

> [!question]- Indice
> Avec les signals : `taches = signal<Tache[]>([])`, `restantes = computed(() => this.taches().filter(t => !t.fini).length)`, et pour modifier `this.taches.update(ts => [...ts, nouvelle])`.

> [!question]- Solution
> ```ts
> @Component({
>   selector: "app-tache-item", standalone: true,
>   template: `<li [class.fini]="tache().fini">
>     <span (click)="basculer.emit(tache().id)">{{ tache().nom }}</span>
>     <button (click)="supprimer.emit(tache().id)">Supprimer</button></li>`,
> })
> export class TacheItemComponent { tache = input.required<Tache>(); basculer = output<number>(); supprimer = output<number>(); }
>
> @Component({
>   selector: "app-liste-taches", standalone: true, imports: [FormsModule, TacheItemComponent, DatePipe],
>   template: `<p>{{ aujourdhui | date:'dd/MM/yyyy' }}</p>
>   <form (ngSubmit)="ajouter()"><input [(ngModel)]="texte" name="texte" /><button [disabled]="!texte">Ajouter</button></form>
>   <ul>@for (t of taches(); track t.id) { <app-tache-item [tache]="t" (basculer)="basculer($event)" (supprimer)="supprimer($event)" /> }
>   @empty { <p>Aucune tâche</p> }</ul>
>   <p>{{ restantes() }} restante(s)</p>`,
> })
> export class ListeTachesComponent {
>   aujourdhui = new Date(); texte = "";
>   taches = signal<Tache[]>([]);
>   restantes = computed(() => this.taches().filter((t) => !t.fini).length);
>   ajouter() { if (!this.texte.trim()) return; this.taches.update((ts) => [...ts, { id: Date.now(), nom: this.texte.trim(), fini: false }]); this.texte = ""; }
>   basculer(id: number) { this.taches.update((ts) => ts.map((t) => t.id === id ? { ...t, fini: !t.fini } : t)); }
>   supprimer(id: number) { this.taches.update((ts) => ts.filter((t) => t.id !== id)); }
> }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
