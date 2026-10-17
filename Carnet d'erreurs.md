---
type: carnet
---
# 🐞 Carnet d'erreurs

Une erreur résolue = une ligne : **le message → la cause → la solution**. La prochaine fois, tu la retrouves en 5 secondes (Ctrl/Cmd + F ou la recherche).
Ajoute une ligne à chaque erreur résolue. Une erreur qui revient souvent mérite d'aller aussi dans les « Limites et pièges » de sa notion.

- `npm ci` → *EUSAGE* → pas de `package-lock.json` dans le dossier où on lance la commande → se placer dans le bon dossier (`cd appTest`) ou générer le lock avec `npm install`
- GitLab CI → *WARNING: no matching files* pour les artifacts → les chemins `artifacts:paths` partent de la **racine du dépôt** → écrire `appTest/playwright-report/`
- Playwright → *ReferenceError: describe is not defined* → il a lu les tests unitaires (`*.spec.ts` d'Angular) → limiter `testDir` au dossier des tests e2e dans `playwright.config.ts`
- CI → *Connection timed out* pendant `apt-get` ou `npx playwright install` → le pare-feu bloque Internet depuis le runner → utiliser l'image `mcr.microsoft.com/playwright` (navigateurs déjà installés) et le miroir npm de l'entreprise
- Test Playwright → *Test timeout* → le site n'est pas joignable depuis le runner (réseau différent) → tester une appli démarrée dans le job (`webServer`) ou une URL accessible depuis le runner
