## React Boilerplate

Proyecto con la estructura inicial para todos los proyectos basados en React.js + Typescript

## Que debo conocer antes de:

### Tecnologias

- ViteJS
- React v18
- Docker
- ESLint
- Prettier
- Husky
- Axios

### Setup

1. Clonar el repositorio
2. Crear archivo `.env` con las variables especificadas en el `.env.sample` 
3. Para correrlo sin docker:

   3.1. Situarse en la raiz del proyecto, proceder a instalar las dependencias con `yarn install`
   
   3.2. Ejecutar `yarn start`
   
4. Para correrlo con docker:
    4.1. Construimos la imagen 
    ```
    docker build -t IMAGE_NAME:$TAG_IMAGE_DEV -f Dockerfile .
    ```
    4.2. Procedemos a crear el container 
    ```
    docker run -dp 3000:3000 --name PROJECT_NAME IMAGE_NAME:$TAG_IMAGE_DEV
    ```
5. Abrir el browser y dirigirse a `localhost:3000`

### Consideraciones para el CI-CD

Como se presenta en el `Dockerfile`, se debe tener en cuenta antes de emitir un lanzamiento hacia el CI se debe de con antelación crear el archivo yarn.lock localmente. Esto con el objetivo de optimizar el despliegue y liberación del proyecto en el servidor, así como también que el motivo es que a nivel del Dockerfile se esta utilizando el comando `yarn install --frozen-lockfile` buscando mejorar el rendimiento del pipeline. 


## Arquitectura

### Clean Architecture

En *Clean Architecture*, una aplicación se divide en responsabilidades y cada una de estas responsabilidades se representa en forma de capa.

Se basa en que la capa de dominio (Models/State) no dependa de ninguna capa exterior. 
La de aplicación sólo depende de la de dominio y el resto (normalmente presentación y acceso a datos) depende de la capa de aplicación. 
Esto se logra con la implementación de interfaces que luego tendrán que implementar las capas externas mediante la inyección de dependencias.

El siguiente diagrama representa la adaptación hecha de Clean Architecture para un proyecto Frontend basado en Typescrit y React

![CleanArchitectureReact](https://user-images.githubusercontent.com/32858351/173492130-2400f1b6-0262-4214-86c8-2733a5219f57.svg)


### Capas

- **Servicios Externos:** es la capa que contiene los servicios que conectan el dominio con el mundo exterior (capas exteriores). Aquí se definen los contratos, interfaces destinados a consumir los servicios externos.

    - **services**: todos aquellos lugares donde vamos a estar llamando para buscar la información


- **Adaptadores:** es la capa de estandarización datos. Implementa interfaces definida en la capa de Servicios Externos y estandariza los responses de los servicios externos buscando llevar a la aplicación la menor cantidad errores humanos.

    - **adapters**: estandarizar en base al modelo y el endpoint de momento. Reciben informacion y la devuelven.
    - **interceptors**: se busca en base a los adapters adaptar lo que enviamos y lo que recibimos (usalmente se utiliza axios como estandar)


- **Componentes:** Aqui se define toda la logica de negocio, mediante los components como tal, los hooks, utilities entre otros...

    - **components**: logica de negocio / componentes estilizados
    - **hooks**: custom hooks que sean reutilizables en un segmento o toda la aplicación, para controlar su ciclo de vida.
    - **routes**: definir las rutas de la aplicación y sus conexiones
    - **utilities**: porciones de logica reutilizables en la aplicacion
    - **assets**: estilos, fonts, recursos graficos, entre otros.


- **Models/State:** es el corazon de la aplicación y tiene que estar totalmente aislada de cualquier dependencia ajena a la lógica o los datos de negocio. Puede contener entidades, value objects, eventos y servicios del dominio. Representan el state y el state en sí.

    - **types/interfaces/models**: dar la representacion de nuestras entidades, y estandarizar un contrato sobre lo que se utilizara.
    - **context**: cualquier recurso que se necesite para manejar el state dentro de un alcance definido y que no sera necesario en toda la aplicación en todo momento.
    - **redux**: información que se necesita en toda la aplicación en todo momento. 

### Patrones y metodologías utilizadas:


*  **Axios:** Para el consumo de servicios en la capa de Servicios Externos

*  **Pruebas unitarias:** Se debe utilizar jest asi como react-testing-library

*  **ESLint:** En este proyecto se utiliza eslinter para la estandarización y verificación del código

*  **Prettier:** De igual manera buscando establecer un estandar de legibilidad del código formateando un estilo en comun.

*  **Husky:** Utilizando las virtudes, como pre-commits en el cual se ejecutan los comandos de eslint y prettier, para que antes de cada commit se le de formato con prettier y se valide el codigo que se trata de commitear con ESLint

### Tecnología CSS

**Importante:** Hasta ahora no se ajustara el template a una tecnologias de css en especifica, con el objetivo de que cada quien al utilizar el template pueda configurar e instalar la tecnologia que le guste

#### Opciones recomendadas:

- **TaildWindCSS** 
- **StyledComponents** 
- **Emotion** 
- **Bootstrap** 
- **AntDesign** 