---
type: course
order: 9
module: "[[Module 24 - .NET]]"
concepts:
  - "[[Endpoint]]"
  - "[[OpenAPI]]"
tags:
  - cours
---
# 09 · Controllers, routes et attributs

> [!info] À quoi ça sert
> Le **controller** est la porte d'entrée HTTP : il reçoit la requête, appelle le service, renvoie la réponse. Les **attributs** `[ ]` posés dessus disent à .NET quelle adresse, quelle méthode HTTP, d'où lire les données.

## 1. Un controller complet

```csharp
[ApiController]                                   // validation et 400 automatiques
[Route("api/[controller]")]                       // → /api/products
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;
    public ProductsController(IProductService service) => _service = service;

    [HttpGet]                                     // GET /api/products
    public async Task<ActionResult<List<ProductDto>>> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id:int}")]                         // GET /api/products/12
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _service.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]                                    // POST /api/products
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id:int}")]                      // DELETE /api/products/12
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return NoContent();                       // 204
    }
}
```

> [!info] Un attribut `[ ]`
> Une étiquette posée sur une classe, une méthode ou un paramètre. Elle ne fait rien seule : .NET la **lit** et agit. Comme les décorateurs `@Get()` en TypeScript (NestJS, Angular).

## 2. Les attributs de route

| Attribut | Sens |
|---|---|
| `[ApiController]` | controller d'API : lit le JSON, valide, 400 auto |
| `[Route("api/[controller]")]` | adresse de base, `[controller]` = nom de la classe sans « Controller » |
| `[HttpGet]` `[HttpPost]` `[HttpPut]` `[HttpPatch]` `[HttpDelete]` | méthode HTTP |
| `[HttpGet("{id:int}")]` | + une partie d'adresse, `{id:int}` = un nombre |
| `[ProducesResponseType(typeof(ProductDto), 200)]` | documente les réponses (Swagger) |

## 3. D'où vient un paramètre

```csharp
public IActionResult Search(
    [FromRoute] int id,                 // /api/products/12
    [FromQuery] string? category,       // ?category=info
    [FromBody] UpdateProductDto dto,    // corps JSON
    [FromHeader(Name = "X-Lang")] string? lang,
    [FromForm] IFormFile file)          // fichier envoyé (multipart)
```

Sans attribut, `[ApiController]` devine : type simple → adresse ou `?`, objet → corps.

## 4. Choisir la réponse

| Méthode (de `ControllerBase`) | Code |
|---|---|
| `Ok(x)` | 200 + JSON |
| `CreatedAtAction(…)` | 201 + adresse du nouvel élément |
| `NoContent()` | 204 |
| `BadRequest("…")` | 400 |
| `Unauthorized()` | 401 |
| `Forbid()` | 403 |
| `NotFound()` | 404 |
| `Conflict()` | 409 |

`ActionResult<T>` = « soit un `T` (200), soit un autre code ». `IActionResult` = n'importe quel code, sans type.

## À retenir
- Le controller ne fait que : recevoir → appeler le service → renvoyer un code.
- Les attributs disent l'adresse et d'où viennent les données.
- Tester sans le front : `/swagger`.

> [!warning] Piège
> Deux routes avec la même méthode et la même adresse : erreur `AmbiguousMatchException` au premier appel.

## Concepts
[[Endpoint]] · [[OpenAPI]]

---
← [[Cours - .NET 08 - Program.cs et la configuration|Program.cs et la configuration]] · [[Cours - .NET - le plan|Le plan]] · [[Cours - .NET 10 - DTO et validation|DTO et validation]] →
