---
type: concept
module: "[[Module 01 - Fondamentaux informatiques]]"
related:
  - "[[Lire et écrire un fichier]]"
tags:
  - concept
  - fondamentaux
---
# Encodage des caractères

> [!info] En une phrase
> La table qui transforme des caractères en octets ; UTF-8 est la norme et sait écrire toutes les langues.

## 1 · Comprendre
### Définition
Un fichier texte n'est qu'une suite d'octets ; l'**encodage** dit quel caractère correspond à quels octets. **ASCII** ne couvre que l'anglais (128 caractères). **UTF-8** couvre tout (accents, arabe, emoji) : 1 octet pour les lettres simples, 2 à 4 pour les autres. Ailleurs on croise encore **Latin-1** / **Windows-1252**.

### Pourquoi ça existe
Les machines ne stockent que des nombres : il faut une convention commune pour le texte.

### Le problème résolu
Les textes illisibles quand l'écrivain et le lecteur n'utilisent pas la même table.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  C[é] -- encoder --> O[c3 a9]
  O -- décoder --> C2[é]
```
Lire de l'UTF-8 en croyant que c'est du Latin-1 donne le fameux `Ã©` au lieu de `é`.

### Exemple concret
```python
"é".encode("utf-8")              # b'\xc3\xa9'
b"\xc3\xa9".decode("latin-1")    # 'Ã©'  ← mauvais décodage
open("f.txt", encoding="utf-8")  # toujours préciser l'encodage
```
```bash
file -i notes.txt                # charset=utf-8 ?
iconv -f latin1 -t utf-8 ancien.txt > nouveau.txt
```

### Cas d'utilisation
- Accents cassés dans un CSV ouvert dans Excel, dans un log, dans une base
- `UnicodeDecodeError` en Python

> [!warning] À ne pas confondre
> **Encodage** (UTF-8, Latin-1 : comment stocker les caractères) et **fins de ligne** (CRLF / LF : comment terminer une ligne, voir [[Fichiers entre Windows et Linux]]). Et un fichier binaire (image) n'a pas d'encodage de texte.

## 3 · Relier
- **Prérequis** : [[Binaire et octet]]
- **Complémentaires** : [[Lire et écrire un fichier]] · [[Fichiers entre Windows et Linux]]
