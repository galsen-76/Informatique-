---
type: notion
statut: a apprendre
resume: "L'adresse IP est le numéro qui identifie une machine sur un réseau, comme une adresse postale."
revu:
sources:
---
```dataviewjs
await dv.view("Systeme/notion")
```

**En une phrase :** L'adresse IP est le **numéro qui identifie une machine sur un réseau**, comme une adresse postale.

## ❓ Le problème

**Pourquoi ça existe ?**
Pour que les données sachent où aller : chaque paquet envoyé contient l'adresse IP de départ et celle d'arrivée.

**Qu'est-ce qui se passait sans ça ?**
Sans adresse, impossible de distinguer les machines : aucune donnée ne pourrait arriver au bon endroit.

## 💡 Comment ça marche

*Explique avec tes mots, comme à un collègue.*

Une IPv4 ressemble à `192.168.1.24` (4 nombres de 0 à 255).

Les adresses à reconnaître :

| Adresse | Sens |
|---|---|
| `127.0.0.1` (`localhost`) | **cette machine elle-même** |
| `192.168.x.x`, `10.x.x.x`, `172.16-31.x.x` | **privées** : réseau local (maison, entreprise, Docker) |
| les autres | **publiques** : joignables sur Internet |
| `0.0.0.0` | « toutes mes adresses » (pour un serveur qui écoute) |

Chez toi, tous tes appareils ont une IP privée ; la box a une IP publique et fait la traduction (**NAT**). Une adresse IP désigne la **machine**, le [[Port]] désigne le **programme** sur cette machine.

```bash
ip a          # Linux : mes adresses
ipconfig      # Windows
```

## ⚠️ Limites et pièges

- **Une IP privée n'est pas joignable depuis Internet** : l'appli sur ton PC n'est pas accessible depuis un runner GitLab dans le cloud.
- **`localhost` change de sens selon où on est** : sur ton PC, dans WSL, dans un conteneur, ce n'est pas la même machine.
- **Les IP peuvent changer** (DHCP, conteneurs) : on utilise plutôt des noms ([[DNS]]).

## 🔗 Liens

- **Prérequis :** 
- **Voir aussi :** [[Port]], [[DNS]], [[Ports et réseau Docker]]
- **Utilisé dans :** comprendre qui peut joindre qui (poste, runner, recette)

## 📚 Notes

- 
