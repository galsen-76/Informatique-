---
created: 2026-09-24
modified: 2026-09-24
type: guide
tags:
  - accueil/corrections
aliases:
  - "Corrections apportées"
---

# 🔧 Corrections apportées au coffre

> [!abstract] Résumé
> Les 91 notes d'origine ont été conservées. Elles sont harmonisées au format le plus complet (celui des notes Angular), corrigées là où elles étaient erronées ou datées, et enrichies (pièges, niveau senior, auto-vérification, questions d'entretien). Plus de 190 notes ont été ajoutées pour couvrir tout le plan.

## Corrections de structure (tout le coffre)
| Problème | Correction |
|---|---|
| Deux formats de propriétés : clés françaises (`créé`, `statut`, `enfants`, `extraits_lies`…) dans Angular/Vue/Docker/IntelliJ, clés anglaises ailleurs | Tout est passé en clés anglaises, compatibles avec `types.json` et le plugin `frontmatter-modified-date` (qui écrit `modified`) |
| Statuts hétérogènes (`🔴 Non commencé`, `🟡 En cours`, `🟡 Learning`) | Valeurs uniques : `🔴 Not Started`, `🟡 In Progress`, `🟢 Done` (utilisées par le [[Tableau-de-bord\|Tableau de bord]]) |
| Tâches marquées `#tache` : **invisibles** pour le plugin Tasks, dont le filtre global est `#task` | Remplacées par `#task` |
| Liens vers `04_Extraits/…` et `02_Projets/…` alors que Templater applique les modèles aux dossiers `04_Snippets/` et `02_Projects/` | Liens unifiés vers `04_Snippets/` et `02_Projects/` |
| Liens vides `[[02_Projects/]]` et `[[04_Snippets/]]` | Pointent vers le bon projet / un snippet nommé d'après la note |
| **La plupart des liens `[[Titre]]` ne menaient nulle part** : Obsidian résout un lien par nom de fichier, or les fichiers s'appellent `TS-03-Interfaces-Types.md` et les liens disaient `[[TS-03-Interfaces-Types\|Interfaces et Types]]` | Tous les liens internes réécrits en `[[fichier\|Titre]]` ; titres ajoutés dans `aliases` |
| Notes parentes inexistantes (`[[TypeScript]]`, `[[Angular]]`, `[[Vue]]`, `[[Docker]]`…) | Création d'une note index (MOC) par domaine |
| Ancien format « One Sentence / What? / Why? » (TypeScript, Python, Architecture) | Converti au format callouts en français (Théorie, Points clés, Connexions…) |
| Notes Git et GitLab au format minimal, sans titre `#` pour certaines | Réécrites au format complet ; `Git.md` éclaté en 8 notes `04-Versionning/Git/` |
| Modèle `TPL_Project` référencé par Templater mais absent | Créé ; `TPL_Base-Knowledge` mis au nouveau format |
| Image `Architecture_backend.png` non utilisée | Intégrée dans [[ARCH-03-Architecture-en-Couches\|Architecture en couches]] |
| Note « Sans titre » (le plan du coffre) | Conservée dans [[Plan-initial-archive]] ; remplacée par la [[Roadmap-12-mois\|Roadmap 12 mois]] |

## Corrections de contenu
| Note | Erreur / point daté | Correction |
|---|---|---|
| [[ANG-02-Composants\|Composants Angular]] | « `standalone` `true` par défaut 17+ » | `true` par défaut depuis **Angular 19** (explicite en 17-18) ; le piège devient « oublier les `imports` » |
| [[ANG-05-Services-DI\|Services & DI Angular]] | `providedIn: 'any'` = « instance par module » | Une instance par injecteur lazy, **déprécié** |
| [[ANG-11-Detection-de-changement\|Détection de changement]] | « L'avenir va vers le zoneless » | Zoneless est stable dans les versions récentes et devient le défaut des nouveaux projets ; explication du déclenchement sans Zone.js |
| [[ANG-14-Tests\|Tests Angular]] | Jasmine + Karma présentés comme la norme | Karma est déprécié ; Vitest (défaut des nouveaux projets récents) ou Jest |
| [[ANG-17-Deploiement-Build\|Déploiement & Build Angular]] | Fichiers `environment` présentés comme générés d'office ; « Angular Universal » | Depuis Angular 15 : `ng generate environments` ; SSR = `@angular/ssr` ; sortie `dist/<projet>/browser` ; config runtime pour une image unique |
| [[VUE-09-Pinia-State-Management\|Pinia]] | Piège « oublier `.value` en déstructurant » | Déstructurer un store perd la réactivité → `storeToRefs()` |
| [[DK-08-Multi-stage-Builds\|Multi-stage Builds]] | L'exemple lançait `npm install && npm run build` **sans copier le code ni `package.json`** → build impossible ; chemin `dist` d'Angular faux | Ajout de `COPY package*.json`, `npm ci`, `COPY . .` ; chemin `dist/<projet>/browser` ; config Nginx `try_files` |
| [[DK-02-Dockerfile\|Dockerfile]] + autres notes Docker | `node:20` (fin de support en avril 2026), `npm install` | `node:22`, `npm ci` (installation reproductible) |
| [[05-GitLab-Avance\|GitLab Avancé]] | `include:` placé **dans** un job (syntaxe invalide) | `include:` au premier niveau du fichier, templates `Jobs/SAST.gitlab-ci.yml`… |
| [[03-CI-CD\|CI/CD GitLab]] | `only` présenté à égalité avec `rules` | `rules` recommandé (`only/except` est l'ancienne syntaxe) ; ajout de `needs`, cache par lockfile |
| [[TS-02-Types-Primitifs-Litteraux\|Types primitifs]] | 5 primitifs listés | Ajout de `bigint` et `symbol` (7 primitifs) |
| [[TS-14-Decorators\|Decorators]] | Pas de distinction entre décorateurs « legacy » et standard | Précision : Angular/NestJS utilisent `experimentalDecorators` ; les décorateurs standard TS 5 ont une autre signature |
| [[TS-15-Async-Promises\|Async/Await]] | `catch (erreur)` utilisé comme un `Error` | En mode strict, `erreur` est `unknown` → `instanceof Error` |

## Réponses aux « Notes brutes »
Plusieurs questions ouvertes des notes d'origine ont reçu une réponse dans la section « Pour aller plus loin » de la note concernée (ex. `toRefs`, `watch` vs `watchEffect`, `CMD` vs `ENTRYPOINT`, `docker system df`, attente d'une BDD avec `service_healthy`, zoneless, `BehaviorSubject` vs signal, DevTools Pinia).

> [!note] Section Python
> Les notes Python sont conservées, harmonisées et complétées d'une auto-vérification. Elles sont marquées `month: Optionnel` : ta stack principale est TypeScript, mais Python reste utile pour les scripts, la data et l'IA (FastAPI).
