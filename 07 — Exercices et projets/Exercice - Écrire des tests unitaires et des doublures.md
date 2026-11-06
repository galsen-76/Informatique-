---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Test automatisé]]"
  - "[[Test unitaire]]"
  - "[[Vitest et Jest]]"
  - "[[Doublure de test (mock)]]"
  - "[[pytest]]"
tags:
  - exercice
---
# Exercice — Écrire des tests unitaires et des doublures

> [!info] Objectif
> Tester, en JavaScript et en Python, des fonctions pures puis une fonction qui dépend d'une API et de la date.
> Notions : [[Test automatisé]] · [[Test unitaire]] · [[Vitest et Jest]] · [[Doublure de test (mock)]] · [[pytest]]

## Consignes
- [ ] Dans un projet Node, installe Vitest et écris `nomArchive(dossier, date)` qui renvoie `dossier-AAAA-MM-JJ.zip` ; teste cas normal, nom avec espaces, dossier vide (erreur)
- [ ] Écris `choisirFichiers(noms, extensions)` et teste-la avec `describe` / `it` (liste vide, majuscules, aucune correspondance)
- [ ] Écris `nomDuJour(dossier)` qui utilise la date actuelle ; teste-la avec `vi.useFakeTimers()` et `vi.setSystemTime`
- [ ] Écris `compterTaches(client)` qui appelle `client.get("/api/tasks")` ; teste-la avec un faux client (succès, erreur levée)
- [ ] En Python, refais `nom_archive` et son test avec pytest, et un test de fonction qui appelle `requests.get` avec `unittest.mock.patch`
- [ ] Casse volontairement une fonction et lis le message d'échec des deux outils

> [!question]- Indice
> `vi.fn().mockRejectedValue(new Error("500"))` simule une erreur ; `await expect(f()).rejects.toThrow("500")` la vérifie.

> [!question]- Solution
> ```js
> export function nomArchive(dossier, date) {
>   if (!dossier.trim()) throw new Error("dossier vide");
>   return `${dossier.trim().replaceAll(" ", "-")}-${date.toISOString().slice(0, 10)}.zip`;
> }
> export const nomDuJour = (d) => nomArchive(d, new Date());
> export async function compterTaches(client) { return (await client.get("/api/tasks")).count; }
>
> describe("nomArchive", () => {
>   it("cas normal", () => expect(nomArchive("export", new Date("2026-11-06"))).toBe("export-2026-11-06.zip"));
>   it("espaces", () => expect(nomArchive("mes images", new Date("2026-11-06"))).toBe("mes-images-2026-11-06.zip"));
>   it("vide", () => expect(() => nomArchive(" ", new Date())).toThrow("dossier vide"));
> });
> it("date du jour", () => {
>   vi.useFakeTimers(); vi.setSystemTime(new Date("2026-01-02"));
>   expect(nomDuJour("x")).toBe("x-2026-01-02.zip");
>   vi.useRealTimers();
> });
> it("compte", async () => {
>   const client = { get: vi.fn().mockResolvedValue({ count: 3 }) };
>   expect(await compterTaches(client)).toBe(3);
>   expect(client.get).toHaveBeenCalledWith("/api/tasks");
> });
> it("erreur", async () => {
>   const client = { get: vi.fn().mockRejectedValue(new Error("500")) };
>   await expect(compterTaches(client)).rejects.toThrow("500");
> });
> ```
> ```python
> from unittest.mock import patch
> def test_compter():
>     with patch("taches.requests.get") as get:
>         get.return_value.json.return_value = {"count": 3}
>         assert compter_taches("https://cvat.ex") == 3
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
