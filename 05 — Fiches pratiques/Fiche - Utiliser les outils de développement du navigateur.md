---
type: howto
concepts:
  - "[[HTML]]"
  - "[[CSS]]"
  - "[[JavaScript]]"
  - "[[HTTP]]"
tags:
  - fiche-pratique
---
# Fiche - Utiliser les outils de développement du navigateur

> [!info] Objectif
> Voir ce que le navigateur a vraiment reçu et exécuté : HTML, styles, erreurs JavaScript, requêtes réseau. **F12** (ou Ctrl+Maj+I) ouvre les outils.

## Étapes
1. **Éléments** : l'arbre HTML réel (après JavaScript). Clic droit sur un élément de la page > *Inspecter*. Double-clic pour modifier un texte ou un attribut en direct.
2. **Styles / Computed** : les règles CSS appliquées (les écrasées sont barrées), le schéma du modèle de boîte. Clique sur une valeur pour la tester.
3. **Console** : les erreurs JavaScript en rouge (avec le fichier et la ligne), et une invite pour taper du JavaScript (`document.querySelector("h1")`).
4. **Réseau** (*Network*) : chaque requête avec sa méthode, son code de statut, sa durée, ses en-têtes et sa réponse. Coche *Disable cache* et recharge. Filtre *Fetch/XHR* pour ne voir que les appels d'API.
5. **Application** : cookies, localStorage, sessionStorage.
6. **Mode appareil** (Ctrl+Maj+M) : simuler un téléphone.
7. **Lighthouse** : audit de performance et d'accessibilité.

> [!success] Vérifier que ça marche
> Sur une page de CVAT, tu sais retrouver la requête qui charge la liste des tâches, son code de statut, et le JSON renvoyé.

## Liens
[[HTML]] · [[CSS]] · [[JavaScript]] · [[HTTP]] · [[Code de statut HTTP]] · [[CORS]]
