---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Pillow]]"
tags:
  - exercice
---
# Exercice — Dessiner avec Pillow

> [!info] Objectif
> Générer une image avec des tracés, comme pour les annotations CVAT.
> Notions : [[Pillow]]

## Consignes
- [ ] Installe Pillow dans ton venv
- [ ] Crée une image blanche de 640×480 et dessine un rectangle rouge et un polygone bleu
- [ ] Écris le texte « essai » dans un coin
- [ ] Enregistre en PNG et ouvre-la
- [ ] Ouvre une vraie photo, dessine un cadre dessus, enregistre une copie redimensionnée à 50 %
- [ ] Produis le PNG en mémoire (`io.BytesIO`) et affiche sa taille en octets

> [!question]- Indice
> `Image.new`, `ImageDraw.Draw(img)`, `draw.rectangle`, `draw.polygon`, `draw.text`, `img.resize((w // 2, h // 2))`. L'origine (0, 0) est en haut à gauche.

> [!question]- Solution
> ```python
> import io
> from PIL import Image, ImageDraw
>
> img = Image.new("RGB", (640, 480), "white")
> d = ImageDraw.Draw(img)
> d.rectangle([(50, 50), (250, 200)], outline="red", width=3)
> d.polygon([(300, 80), (500, 120), (420, 300)], outline="blue", width=3)
> d.text((10, 10), "essai", fill="black")
> img.save("trace.png")
>
> photo = Image.open("photo.jpg")
> ImageDraw.Draw(photo).rectangle([(0, 0), (photo.width - 1, photo.height - 1)], outline="red", width=10)
> photo.resize((photo.width // 2, photo.height // 2)).save("photo_petite.jpg")
>
> buf = io.BytesIO(); img.save(buf, format="PNG"); print(len(buf.getvalue()))
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
