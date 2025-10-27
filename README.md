# Futbol Store

Sitio estático de ejemplo con HTML/CSS. Contiene un `index.html`, `styles.css` y la carpeta `assets/imagenes`.

Cómo publicar en GitHub Pages

1. Inicializa git localmente (si no lo has hecho):

```powershell
Set-Location -Path 'E:\Cosas programación\Cursos\Front-end JS Talento Tech\Proyecto'
git init
git branch -M main
git add .
git commit -m "Initial commit"
```

2. Crea un repositorio remoto en GitHub (nombre: `futbol-store` por ejemplo) y añade el remoto:

```powershell
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

3. Habilita GitHub Pages: en la configuración del repo -> Pages, selecciona la rama `main` y carpeta `/ (root)`. Guarda.

Alternativa con la CLI `gh`:

```powershell
# crear repo público y empujar en un paso (si tienes `gh` autenticado)
gh repo create <tu-usuario>/<tu-repo> --public --source . --push
# luego habilitar pages desde settings o con gh (opcional)
```

Si quieres, puedo crear y empujar el repo remoto por ti (necesitarás `gh` configurado o introducir credenciales).