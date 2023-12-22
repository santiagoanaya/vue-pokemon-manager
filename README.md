# pokemons-app

## Vue Pokemon Challenge

### Tecnologías Utilizadas y Decisiones de Diseño

Tecnologías:
Para el desarrollo de este proyecto, se seleccionaron tecnologías modernas y robustas que garantizan una experiencia de usuario fluida y una arquitectura escalable. Estas tecnologías incluyen:

Vue.js: Utilizado como el framework principal, Vue.js ofrece un enfoque reactivo y componible para construir interfaces de usuario.
Vuetify: Este framework de UI para Vue.js proporciona un amplio conjunto de componentes predefinidos y responsivos, lo que facilitó la implementación de la interfaz gráfica del proyecto y aseguró la coherencia visual.
Vuex: Se usó para la gestión del estado de la aplicación, permitiendo un manejo centralizado y eficiente de los datos compartidos entre componentes, crucial para el manejo de grandes volúmenes de información.
Jest: Seleccionado para las pruebas unitarias, Jest tiene sintaxis clara y un entorno de pruebas robusto.

Decisiones de Diseño:

Separación de Vistas: Se implementaron vistas distintas para el 'Home' y el 'Listado de pokemones'. Esto no solo mejora la organización del código, sino que también facilita la navegación y mejora la experiencia del usuario.

Componentización: Tanto el buscador como la lista de pokemones se diseñaron como componentes reutilizables. Esto no solo mejora la mantenibilidad del código, sino que también prepara el terreno para futuras extensiones del proyecto.

Gestión de Estado con Vuex: Para necesidad de manejar eficientemente una gran cantidad de datos. Esto permite un manejo centralizado y eficaz del estado, especialmente útil para los datos de los pokemones y sus detalles.

Optimización de Llamadas API: Para evitar llamadas redundantes a la API, se implementó un diccionario de detalles de pokemones en Vuex. Esto garantiza que cada Pokémon se cargue una sola vez, crucial para el rendimiento y la eficiencia.

Uso de Vue Router: Para manejar la navegación entre diferentes vistas de manera eficiente, se utilizó Vue Router. Esto proporciona una transición suave y una mejor gestión del estado de la interfaz de usuario entre vistas.

Generación de IDs para Pokémons: Debido a la ausencia de IDs en los datos proporcionados por la API, se generaron identificadores únicos para los pokemones basados en sus URL. Esto facilitó la ordenación y gestión de los datos.

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your unit tests

```bash
npm run test:unit
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
