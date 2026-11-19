# À faire : un dossier temporaire par requête (fonction convert-graph)

**Pourquoi** : `numWorkers: 2` = 2 requêtes en parallèle dans le même conteneur. Elles écrivent dans les mêmes `data/annotations.xml` et `zip_files/export.zip` et peuvent se mélanger.

**Solution** : `tempfile.TemporaryDirectory()` crée un dossier au nom unique par requête, supprimé à la fin du `with`.

## main.py (dans le `try`)

```python
import tempfile
...
    try:
        # Dossier propre à cette requête, supprimé automatiquement à la fin du with
        with tempfile.TemporaryDirectory() as tmp:
            work_dir = Path(tmp)

            with ApiClient(configuration) as api_client:
                get_annotations(api_client, ExportParams(job_id), work_dir)

            extract_folio_data(folio_id, work_dir)

            result = run_geometry(
                work_dir / "annotations.xml",
                folio_id,
                10.0,
                50.0,
                2.0,
                10.0,
                None,
                work_dir / "output",
            )
            png = Path(result["overlay_png_path"]).read_bytes()

        return context.Response(body=png, content_type="image/png", status_code=200)
```

## sdk_cvat.py (chaque fonction reçoit `work_dir` et le passe à la suivante)

```python
def get_annotations(api_client: ApiClient, parameters: ExportParams, work_dir: Path) -> None:
    ...
    wait_for_export(api_client, data["rq_id"], work_dir)


def wait_for_export(api_client: ApiClient, request_id: str, work_dir: Path) -> None:
    ...
    store_annotations(export_request.result_url, work_dir)


def store_annotations(result_url: str, work_dir: Path) -> None:
    ...
    zip_path = work_dir / "export.zip"
    zip_path.write_bytes(response.content)

    with zipfile.ZipFile(zip_path) as annotations_zip:
        annotations_zip.extract("annotations.xml", work_dir)


def extract_folio_data(folio_id: int, work_dir: Path) -> None:
    xml_path = work_dir / "annotations.xml"
    tree = ET.parse(xml_path)
    ...
    tree.write(xml_path, encoding="utf-8", xml_declaration=True)
```

- Plus besoin de `mkdir` : le dossier existe déjà.
- Lire le PNG **avant** de sortir du `with` (le dossier est supprimé après).
- À vérifier : que `run_geometry` écrit bien son PNG dans le dossier de sortie donné.
