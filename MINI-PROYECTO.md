# Mini proyecto: "Bitácora" — practicá Git haciendo, no solo leyendo

Este es un proyecto real y funcional: una lista de tareas llamada **Bitácora**
(`index.html`, `style.css`, `script.js`). La idea no es que lo mires, sino que
lo uses como terreno de práctica para cada comando de Git que aprendiste.

No hace falta servidor ni instalar nada: abrí `index.html` en el navegador y
ya funciona.

---

## Paso 0 — Poné el proyecto bajo control de versiones

```bash
cd mini-proyecto-git
git init
git add .
git commit -m "Commit inicial: bitácora de tareas funcionando"
```

Revisá el resultado:
```bash
git log --oneline
git status
```

---

## Paso 1 — Subilo a GitHub

1. Creá un repositorio vacío en GitHub (sin README, para no generar conflictos).
2. Conectalo y subí tu primer commit:

```bash
git branch -M main
git remote add origin https://github.com/TU-USUARIO/bitacora.git
git push -u origin main
```

---

## Paso 2 — Primera funcionalidad en una rama

Vas a agregar un **contador de entradas pendientes** en el encabezado.

```bash
git switch -c feature/contador-pendientes
```

Editá `script.js`: en la función `render()`, además de `countLabel`, calculá
cuántas entradas tienen `done === false` y mostralo en algún lado (por ejemplo,
agregando un `<span>` nuevo en `index.html` dentro de `.log-meta`).

Cuando funcione:
```bash
git add .
git commit -m "Agrega contador de tareas pendientes"
git push -u origin feature/contador-pendientes
```

Andá a GitHub y abrí tu primer **Pull Request** de `feature/contador-pendientes`
hacia `main`. Leé el diff que te muestra GitHub: es exactamente lo que
cambiaste.

---

## Paso 3 — Fusioná y limpiá

Fusioná el PR desde GitHub (botón *Merge pull request*), y después en tu
terminal:

```bash
git switch main
git pull origin main
git branch -d feature/contador-pendientes
```

---

## Paso 4 — Provocá un conflicto a propósito

Este es el ejercicio que más rinde. Vas a modificar la misma línea desde dos
ramas distintas:

```bash
git switch -c feature/cambiar-titulo
```
En `index.html`, cambiá el texto del `<h1>Bitácora</h1>` por algo como
`<h1>Mi Bitácora</h1>`. Commiteá pero **no** subas todavía:
```bash
git add .
git commit -m "Cambia el título a Mi Bitácora"
```

Ahora, sin subir esa rama, volvé a `main` y creá otra rama distinta que
también toque el título:
```bash
git switch main
git switch -c feature/titulo-en-mayusculas
```
Cambiá el mismo `<h1>` a `<h1>BITÁCORA</h1>`, commiteá:
```bash
git add .
git commit -m "Pone el título en mayúsculas"
```

Fusioná una rama a `main` normalmente, y luego intentá fusionar la otra:
```bash
git switch main
git merge feature/titulo-en-mayusculas
git merge feature/cambiar-titulo   # ← acá aparece el conflicto
```

Abrí `index.html`, vas a ver las marcas `<<<<<<<`, `=======`, `>>>>>>>`.
Decidí qué título querés dejar, borrá las marcas, y:
```bash
git add index.html
git commit
```

¡Resolviste tu primer conflicto real!

---

## Paso 5 — Practicá deshacer cambios

```bash
# Cambiá algo en script.js sin guardar todavía en staging
git restore script.js          # descarta el cambio

# Cometé un mensaje de commit feo a propósito y corregilo:
git commit --amend -m "Mensaje corregido y más claro"

# Deshacé un commit ya subido, de forma segura:
git revert <hash-del-commit>
```

---

## Paso 6 — Simulá colaboración con un fork

Si tenés un amigo/a aprendiendo también, que haga **fork** de tu repo,
clone su fork, cree una rama, agregue una funcionalidad (por ejemplo, un
botón "Borrar todas las hechas") y te mande un Pull Request. Vos lo revisás
y lo fusionás desde GitHub. Es la mejor forma de sentir el flujo real.

Si no tenés con quién practicar, hacé el fork vos mismo/a desde otra cuenta
o simplemente simulá el flujo completo igual, solo.

---

## Ideas de funcionalidades para seguir practicando (una rama por cada una)

- `feature/editar-entrada` — permitir editar el texto de una tarea ya creada.
- `feature/orden-por-fecha` — botón para ordenar entradas por más reciente/antigua.
- `feature/borrar-hechas` — un botón que borre de una todas las tareas completadas.
- `feature/modo-oscuro` — un toggle que cambie la paleta de colores.
- `fix/input-vacio` — validar que no se puedan crear tareas vacías o solo con espacios (mirá si ya está resuelto en `addEntry`, y si no, arreglalo).

Cada una de estas es una rama nueva, un commit (o varios) claros, un push, y
un Pull Request. Repetir ese ciclo es lo que hace que Git se vuelva
automático.
