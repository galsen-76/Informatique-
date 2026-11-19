---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[État React (useState)]]"
  - "[[Effet React (useEffect)]]"
  - "[[Hook React]]"
tags:
  - exercice
---
# Exercice — Charger et filtrer des données dans React

> [!info] Objectif
> Brancher l'interface sur une vraie API avec gestion du chargement, des erreurs et d'un filtre.
> Notions : [[État React (useState)]] · [[Effet React (useEffect)]] · [[Hook React]]

## Consignes
- [ ] Écris un hook `useDonnees<T>(url)` qui renvoie `{ donnees, erreur, chargement }` et annule la requête au nettoyage
- [ ] Charge `https://jsonplaceholder.typicode.com/todos?_limit=30` et affiche la liste
- [ ] Ajoute un champ de recherche (champ contrôlé) et un filtre « toutes / faites / à faire » : la liste filtrée est **calculée**, pas stockée dans un état
- [ ] Ajoute une case à cocher par ligne qui bascule `completed` dans l'état (sans modifier l'objet en place)
- [ ] Ajoute un sélecteur d'utilisateur (1 à 5) : l'URL change, le hook recharge
- [ ] Écris `useStockageLocal` et garde le filtre choisi après un rechargement
- [ ] Ouvre l'onglet Réseau : vérifie qu'une requête annulée apparaît quand tu changes vite d'utilisateur

> [!question]- Indice
> La liste affichée : `const visibles = todos.filter(...)` directement dans le composant. Pour basculer : `setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))`.

> [!question]- Solution
> ```tsx
> function useDonnees<T>(url: string) {
>   const [donnees, setDonnees] = useState<T | null>(null);
>   const [erreur, setErreur] = useState<string | null>(null);
>   useEffect(() => {
>     const ctrl = new AbortController();
>     setDonnees(null); setErreur(null);
>     fetch(url, { signal: ctrl.signal })
>       .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Erreur ${r.status}`))))
>       .then(setDonnees)
>       .catch((e) => e.name !== "AbortError" && setErreur(e.message));
>     return () => ctrl.abort();
>   }, [url]);
>   return { donnees, erreur, chargement: donnees === null && erreur === null };
> }
> function useStockageLocal<T>(cle: string, initial: T) {
>   const [v, setV] = useState<T>(() => { try { return JSON.parse(localStorage.getItem(cle) ?? "") } catch { return initial } });
>   useEffect(() => { localStorage.setItem(cle, JSON.stringify(v)); }, [cle, v]);
>   return [v, setV] as const;
> }
> export default function Todos() {
>   const [user, setUser] = useState(1);
>   const { donnees, erreur, chargement } = useDonnees<Todo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${user}`);
>   const [todos, setTodos] = useState<Todo[]>([]);
>   useEffect(() => { if (donnees) setTodos(donnees); }, [donnees]);
>   const [q, setQ] = useState("");
>   const [filtre, setFiltre] = useStockageLocal<"toutes" | "faites" | "a-faire">("filtre", "toutes");
>   const visibles = todos.filter((t) => t.title.includes(q) &&
>     (filtre === "toutes" || (filtre === "faites") === t.completed));
>   if (erreur) return <p>{erreur}</p>;
>   if (chargement) return <p>Chargement…</p>;
>   return (<>
>     <select value={user} onChange={(e) => setUser(Number(e.target.value))}>{[1,2,3,4,5].map((u) => <option key={u}>{u}</option>)}</select>
>     <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher" />
>     <select value={filtre} onChange={(e) => setFiltre(e.target.value as typeof filtre)}>
>       <option value="toutes">Toutes</option><option value="faites">Faites</option><option value="a-faire">À faire</option>
>     </select>
>     <ul>{visibles.map((t) => <li key={t.id}><label><input type="checkbox" checked={t.completed}
>       onChange={() => setTodos(todos.map((x) => x.id === t.id ? { ...x, completed: !x.completed } : x))} /> {t.title}</label></li>)}</ul>
>   </>);
> }
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
