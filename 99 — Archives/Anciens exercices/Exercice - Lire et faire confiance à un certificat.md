---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[HTTPS et TLS]]"
  - "[[Certificat]]"
tags:
  - exercice
---
# Exercice — Lire et faire confiance à un certificat

> [!info] Objectif
> Comprendre ce qu'il y a dans un certificat et corriger une erreur sans désactiver la sécurité.
> Notions : [[HTTPS et TLS]] · [[Certificat]]

## Consignes
- [ ] Avec `curl -v`, affiche la version TLS et le certificat de `https://gitlab.com`
- [ ] Avec `openssl s_client` puis `openssl x509`, affiche le nom, l'émetteur et les dates
- [ ] Visite `https://expired.badssl.com` et `https://self-signed.badssl.com` avec curl : lis les erreurs
- [ ] Crée un certificat auto-signé pour `localhost` avec openssl, et sers une page en HTTPS avec Python
- [ ] Fais confiance à ce certificat dans WSL (`update-ca-certificates`) et vérifie que curl ne râle plus

> [!question]- Indice
> `openssl req -x509 -newkey rsa:2048 -nodes -keyout cle.pem -out cert.pem -days 30 -subj "/CN=localhost"`. Pour le serveur, le module `ssl` de Python avec `http.server`.

> [!question]- Solution
> ```bash
> curl -v https://gitlab.com -o /dev/null 2>&1 | grep -iE "TLS|subject|issuer|expire"
> openssl s_client -connect gitlab.com:443 -servername gitlab.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
> curl https://expired.badssl.com        # certificate has expired
> openssl req -x509 -newkey rsa:2048 -nodes -keyout cle.pem -out cert.pem -days 30 -subj "/CN=localhost"
> python3 -c "import http.server,ssl; s=http.server.HTTPServer(('0.0.0.0',8443),http.server.SimpleHTTPRequestHandler); c=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER); c.load_cert_chain('cert.pem','cle.pem'); s.socket=c.wrap_socket(s.socket,server_side=True); s.serve_forever()" &
> curl https://localhost:8443            # self-signed : refusé
> sudo cp cert.pem /usr/local/share/ca-certificates/localhost.crt && sudo update-ca-certificates
> curl https://localhost:8443            # OK
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
