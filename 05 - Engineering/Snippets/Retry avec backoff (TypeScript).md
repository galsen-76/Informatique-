---
type: engineering
kind: snippet
project: 
language: ts
created: 2026-11-03
tags:
  - tech
  - demo
---
# Retry avec backoff (TypeScript)

Réessayer un appel instable avec un délai exponentiel.

```ts
export async function retry<T>(fn: () => Promise<T>, attempts = 3, baseMs = 200): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try { return await fn(); }
    catch (e) { last = e; await new Promise(r => setTimeout(r, baseMs * 2 ** i)); }
  }
  throw last;
}
```
