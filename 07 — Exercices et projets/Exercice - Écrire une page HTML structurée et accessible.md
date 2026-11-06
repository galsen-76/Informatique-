---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[HTML]]"
  - "[[Élément et attribut HTML]]"
  - "[[Formulaire HTML]]"
  - "[[Accessibilité web]]"
tags:
  - exercice
---
# Exercice — Écrire une page HTML structurée et accessible

> [!info] Objectif
> Écrire à la main une page complète, correcte et accessible.
> Notions : [[HTML]] · [[Élément et attribut HTML]] · [[Formulaire HTML]] · [[Accessibilité web]]

## Consignes
- [ ] Crée `index.html` avec le squelette complet (doctype, lang, charset, viewport, title)
- [ ] Ajoute un en-tête avec un titre et un menu de 3 liens, un `main` avec deux `article`, un pied de page
- [ ] Ajoute une image avec un `alt` qui décrit vraiment l'image, une liste et un tableau simple
- [ ] Ajoute un formulaire de contact : nom (obligatoire), e-mail, sujet (liste déroulante), message, case à cocher, bouton
- [ ] Ouvre la page, navigue uniquement au clavier (Tab, Entrée, Espace)
- [ ] Passe Lighthouse (Accessibilité) et corrige tout ce qui est signalé
- [ ] Valide le HTML sur validator.w3.org

> [!question]- Indice
> Chaque `input` a un `label for="…"` qui correspond à son `id`. `type="email"` et `required` donnent une validation gratuite.

> [!question]- Solution
> ```html
> <!doctype html>
> <html lang="fr">
> <head>
>   <meta charset="utf-8">
>   <meta name="viewport" content="width=device-width, initial-scale=1">
>   <title>Mon atelier</title>
> </head>
> <body>
>   <header>
>     <h1>Mon atelier</h1>
>     <nav><a href="#projets">Projets</a> <a href="#notes">Notes</a> <a href="#contact">Contact</a></nav>
>   </header>
>   <main>
>     <article id="projets"><h2>Projets</h2><p>…</p><img src="cvat.png" alt="Capture de l'interface CVAT avec une tâche ouverte"></article>
>     <article id="contact">
>       <h2>Contact</h2>
>       <form>
>         <label for="nom">Nom</label> <input id="nom" name="nom" required>
>         <label for="mail">E-mail</label> <input id="mail" name="mail" type="email">
>         <label for="sujet">Sujet</label>
>         <select id="sujet" name="sujet"><option>Question</option><option>Bug</option></select>
>         <label for="msg">Message</label> <textarea id="msg" name="msg"></textarea>
>         <label><input type="checkbox" name="copie"> Recevoir une copie</label>
>         <button type="submit">Envoyer</button>
>       </form>
>     </article>
>   </main>
>   <footer><p>© 2026</p></footer>
> </body>
> </html>
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
