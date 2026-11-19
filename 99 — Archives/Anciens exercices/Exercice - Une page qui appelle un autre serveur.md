---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[CORS]]"
tags:
  - exercice
  - mini-projet
---
# Exercice - Une page qui appelle un autre serveur

> [!info] Où tu en es
> **Cours à avoir lu :** [[Cours - Une API robuste, validation, erreurs et CORS]] et la fiche [[CORS]]
> **Notion validée par cet exercice :** [[CORS]]
> **Ce qu'il faut savoir déjà :** lancer un script Python et ouvrir les outils du navigateur (F12). Tout le reste est fourni.
> **Lien avec ton POC :** c'est exactement la situation du bouton CVAT qui appelle `convert-png`, en tout petit.

## Le but
Une **page** (port `8000`) a un bouton qui envoie du JSON à un **service** (port `9000`). Le service marche, curl le prouve, mais le navigateur refuse. Tu modifies **seulement le service** jusqu'à ce que la page affiche sa réponse, y compris quand le service renvoie une erreur.

## Les fichiers de départ
Crée `~/projets/cors` avec ces fichiers. Seul `serveur.py` est à modifier, et seulement avec la bibliothèque standard.

`serveur.py`
```python
"""Un faux service sur le port 9000 : il reçoit du JSON et répond du JSON."""
import json
from http.server import BaseHTTPRequestHandler, HTTPServer


class Service(BaseHTTPRequestHandler):
    def do_POST(self):
        taille = int(self.headers.get("Content-Length", 0))
        donnees = json.loads(self.rfile.read(taille) or b"{}")

        if donnees.get("casse"):
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"erreur": "le traitement a plante"}')
            return

        reponse = {"message": f"Bonjour {donnees.get('nom', 'inconnu')}, le service a bien recu ta demande"}
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(reponse).encode())


print("Service sur http://localhost:9000")
HTTPServer(("localhost", 9000), Service).serve_forever()
```

`page/index.html`
```html
<!doctype html>
<meta charset="utf-8">
<title>La page</title>
<h1>La page (port 8000)</h1>
<button id="envoyer">Appeler le service</button>
<button id="casser">Appeler le service (cas d'erreur)</button>
<pre id="resultat">Rien pour l'instant.</pre>
<script>
  const SERVICE = "http://localhost:9000/";

  async function appeler(donnees) {
    const zone = document.getElementById("resultat");
    try {
      const reponse = await fetch(SERVICE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
      });
      zone.textContent = `Statut ${reponse.status}\n` + await reponse.text();
    } catch (erreur) {
      zone.textContent = "Le fetch a échoué : " + erreur + "\n(regarde la console et l'onglet Réseau)";
    }
  }

  document.getElementById("envoyer").onclick = () => appeler({ nom: "Oumar" });
  document.getElementById("casser").onclick = () => appeler({ nom: "Oumar", casse: true });
</script>
```

Pour lancer, dans deux terminaux :
```bash
python3 serveur.py                                  # le service, port 9000
python3 -m http.server 8000 --directory page        # la page, port 8000
```
Puis ouvre `http://localhost:8000` dans ton navigateur, avec les outils (F12), onglets **Console** et **Réseau**.

> [!tip] Au travail
> Si curl vers `localhost` renvoie une page du proxy ou un `407`, ajoute `export NO_PROXY=localhost,127.0.0.1` (voir [[Proxy]]).

## Ce que tu fais
- [ ] Clique sur « Appeler le service ». Recopie le message de la console. Dans l'onglet Réseau, combien de lignes vers le port `9000` vois-tu, avec quelle méthode et quel statut ?
- [ ] Envoie la **même** requête au service avec curl (même méthode, même `Content-Type`, même corps). Que répond-il ? Le service est-il cassé ?
- [ ] Modifie `serveur.py` jusqu'à ce que la page affiche « Bonjour Oumar… ». Autorise **seulement** l'origine de la page, pas `*`
- [ ] Clique maintenant sur « (cas d'erreur) ». La page doit afficher `Statut 500` et le message d'erreur du service, pas « Le fetch a échoué ». Corrige si besoin
- [ ] Dans la page, remplace temporairement `"Content-Type": "application/json"` par `"text/plain"`. Regarde l'onglet Réseau : qu'est-ce qui a disparu, et pourquoi ? Remets `application/json`
- [ ] Dans le service, mets `Access-Control-Allow-Origin: *`, et dans la page ajoute `credentials: "include"` au `fetch`. Que dit la console ? Remets l'origine exacte et trouve l'en-tête qui manque encore pour que ça marche avec `credentials`
- [ ] Transfert vers ton POC : relis la partie « Exemple concret : une fonction Nuclio » de la fiche [[CORS]]. Pour `convert-png`, choisis l'option 1 (en-têtes dans `context.Response`) ou l'option 2 (`cors` dans `function.yaml`), et écris pourquoi en deux phrases

> [!warning] Les pièges de cet exercice
> - Le navigateur envoie parfois **une autre requête avant la tienne**, que ton code ne prévoyait pas.
> - Une réponse d'erreur sans les bons en-têtes ne s'affiche pas comme une erreur : elle s'affiche comme un problème CORS.

> [!success] Ça marche si…
> Les deux boutons affichent la réponse du service (`200` puis `500`), aucune erreur CORS dans la console, et le service n'autorise que `http://localhost:8000`.

## Est-ce que j'ai compris ?
Réponds en quelques mots, en dessous, ou demande à Claude de t'interroger.
1. Pourquoi curl marchait alors que le navigateur bloquait ? Le service a-t-il reçu le premier `POST` ?
2. Qu'est-ce que la requête `OPTIONS`, qui l'envoie, et qu'est-ce qui l'a déclenchée ici ?
3. Pourquoi le cas d'erreur affichait-il une erreur CORS au lieu d'un `500` ?
4. Pourquoi `*` ne marche-t-il pas avec `credentials: "include"` ?
5. Pour `convert-png`, quelle origine faut-il autoriser : celle de CVAT, ou celle de la fonction ?

> [!quote] Mes réponses
> _À écrire._

> [!question]- Indice
> Lis la ligne `OPTIONS` dans l'onglet Réseau : son statut (`501`) dit que le service ne connaît pas cette méthode. `BaseHTTPRequestHandler` appelle `do_<MÉTHODE>` : il te manque une méthode. Ensuite, les en-têtes `Access-Control-Allow-*` doivent être envoyés **avant** `end_headers()`, sur **chaque** réponse. Une petite fonction qui les ajoute évite d'en oublier.

> [!question]- Solution
> ```python
> import json
> from http.server import BaseHTTPRequestHandler, HTTPServer
>
> CORS = {
>     "Access-Control-Allow-Origin": "http://localhost:8000",
>     "Access-Control-Allow-Methods": "POST, OPTIONS",
>     "Access-Control-Allow-Headers": "Content-Type",
> }
>
> class Service(BaseHTTPRequestHandler):
>     def envoyer_cors(self):
>         for nom, valeur in CORS.items():
>             self.send_header(nom, valeur)
>
>     def do_OPTIONS(self):
>         self.send_response(204)
>         self.envoyer_cors()
>         self.end_headers()
>
>     def do_POST(self):
>         taille = int(self.headers.get("Content-Length", 0))
>         donnees = json.loads(self.rfile.read(taille) or b"{}")
>         if donnees.get("casse"):
>             self.send_response(500)
>             self.send_header("Content-Type", "application/json")
>             self.envoyer_cors()
>             self.end_headers()
>             self.wfile.write(b'{"erreur": "le traitement a plante"}')
>             return
>         reponse = {"message": f"Bonjour {donnees.get('nom', 'inconnu')}, le service a bien recu ta demande"}
>         self.send_response(200)
>         self.send_header("Content-Type", "application/json")
>         self.envoyer_cors()
>         self.end_headers()
>         self.wfile.write(json.dumps(reponse).encode())
>
> HTTPServer(("localhost", 9000), Service).serve_forever()
> ```
> 1. curl ne fait aucune vérification CORS : c'est une règle **du navigateur**. Ici, le navigateur n'a même pas envoyé le `POST` : il a d'abord envoyé un `OPTIONS` (le preflight), le service a répondu `501`, et le navigateur s'est arrêté là.
> 2. C'est le preflight : le navigateur demande la permission avant une requête « non simple ». Ici, c'est `Content-Type: application/json` qui rend la requête non simple. Avec `text/plain`, plus de preflight : le `POST` part directement (mais sa réponse doit quand même avoir `Access-Control-Allow-Origin`).
> 3. La réponse `500` n'avait pas `Access-Control-Allow-Origin` : le navigateur cache **toute** la réponse au JavaScript, y compris son statut. Il faut les en-têtes CORS sur toutes les réponses, erreurs comprises. C'est pareil dans `convert-png` (`reponse_erreur`).
> 4. Avec des cookies, « n'importe quel site peut lire la réponse » serait dangereux : le navigateur exige l'origine exacte **et** `Access-Control-Allow-Credentials: true`.
> 5. Celle de la **page** qui appelle, donc CVAT (`http://localhost:8080`, ou `:3000` en mode dev). L'origine, c'est toujours celle de la page, jamais celle du service appelé.

## Validation
- [ ] Le projet marche comme décrit dans « Ça marche si… »
- [ ] J'ai répondu aux questions et Claude les a vérifiées
