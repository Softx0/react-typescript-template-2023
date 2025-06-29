# Azure DevOps Pipeline Variables

Este documento describe todas las variables que deben configurarse en Azure DevOps para cada ambiente (DEV, QA, PROD).

## 🔧 Variables Requeridas por Ambiente

### Variables de Build y Docker

#### DEV Environment

- `TAG_IMAGE_DEV` - Tag para la imagen Docker de desarrollo (ej: `dev-latest`)
- `NODE_ENV_DEV` - Entorno de Node.js (ej: `development`)
- `PORT_DEV` - Puerto de la aplicación (ej: `3000`)

#### QA Environment

- `TAG_IMAGE_QA` - Tag para la imagen Docker de QA (ej: `qa-latest`)
- `NODE_ENV_QA` - Entorno de Node.js (ej: `staging`)
- `PORT_QA` - Puerto de la aplicación (ej: `3000`)

#### PROD Environment

- `TAG_IMAGE_PROD` - Tag para la imagen Docker de producción (ej: `prod-latest`)
- `NODE_ENV_PROD` - Entorno de Node.js (ej: `production`)
- `PORT_PROD` - Puerto de la aplicación (ej: `3000`)

### Variables de API Configuration

#### DEV Environment

- `VITE_API_BASE_URL_DEV` - URL base del API de desarrollo
- `VITE_API_TIMEOUT_DEV` - Timeout para requests API (ej: `10000`)

#### QA Environment

- `VITE_API_BASE_URL_QA` - URL base del API de QA
- `VITE_API_TIMEOUT_QA` - Timeout para requests API (ej: `10000`)

#### PROD Environment

- `VITE_API_BASE_URL_PROD` - URL base del API de producción
- `VITE_API_TIMEOUT_PROD` - Timeout para requests API (ej: `15000`)

### Variables JWT Configuration

#### DEV Environment

- `VITE_JWT_SECRET_DEV` - Secret key para JWT (debe ser seguro)
- `VITE_JWT_EXPIRES_IN_DEV` - Tiempo de expiración JWT (ej: `24h`)

#### QA Environment

- `VITE_JWT_SECRET_QA` - Secret key para JWT (debe ser seguro)
- `VITE_JWT_EXPIRES_IN_QA` - Tiempo de expiración JWT (ej: `24h`)

#### PROD Environment

- `VITE_JWT_SECRET_PROD` - Secret key para JWT (debe ser muy seguro)
- `VITE_JWT_EXPIRES_IN_PROD` - Tiempo de expiración JWT (ej: `12h`)

### Variables Feature Flags

#### DEV Environment

- `VITE_ENABLE_INACTIVITY_TIMER_DEV` - Habilitar timer de inactividad (ej: `true`)
- `VITE_DEFAULT_INACTIVITY_TIME_DEV` - Tiempo de inactividad en ms (ej: `600000`)

#### QA Environment

- `VITE_ENABLE_INACTIVITY_TIMER_QA` - Habilitar timer de inactividad (ej: `true`)
- `VITE_DEFAULT_INACTIVITY_TIME_QA` - Tiempo de inactividad en ms (ej: `300000`)

#### PROD Environment

- `VITE_ENABLE_INACTIVITY_TIMER_PROD` - Habilitar timer de inactividad (ej: `true`)
- `VITE_DEFAULT_INACTIVITY_TIME_PROD` - Tiempo de inactividad en ms (ej: `300000`)

### Variables de Environment

#### DEV Environment

- `VITE_ENVIRONMENT_DEV` - Identificador del ambiente (ej: `development`)

#### QA Environment

- `VITE_ENVIRONMENT_QA` - Identificador del ambiente (ej: `staging`)

#### PROD Environment

- `VITE_ENVIRONMENT_PROD` - Identificador del ambiente (ej: `production`)

### Variables Legacy (Compatibilidad)

#### DEV Environment

- `REACT_APP_API_URL_DEV` - URL del API (compatibilidad)
- `REACT_APP_API_KEY_DEV` - API Key (compatibilidad)

#### QA Environment

- `REACT_APP_API_URL_QA` - URL del API (compatibilidad)
- `REACT_APP_API_KEY_QA` - API Key (compatibilidad)

#### PROD Environment

- `REACT_APP_API_URL_PROD` - URL del API (compatibilidad)
- `REACT_APP_API_KEY_PROD` - API Key (compatibilidad)

## 🔐 Variables de Docker Registry

Estas variables son requeridas para el login y push de imágenes Docker:

- `DOCKER_REGISTRY_USERNAME` - Usuario del registro de contenedores
- `DOCKER_REGISTRY_PASSWORD` - Contraseña del registro de contenedores

## 🚀 Configuración en Azure DevOps

### Paso 1: Acceder a Variables

1. Ve a tu proyecto en Azure DevOps
2. Navega a **Pipelines** > **Library**
3. Crea un nuevo **Variable Group** para cada ambiente

### Paso 2: Crear Variable Groups

Crea los siguientes grupos de variables:

- `frontend-dev-variables`
- `frontend-qa-variables`
- `frontend-prod-variables`

### Paso 3: Configurar Variables

Para cada grupo, agrega todas las variables correspondientes al ambiente.

### Paso 4: Vincular al Pipeline

En tu `azure-pipelines.yml`, asegúrate de importar los grupos de variables:

```yaml
variables:
  - group: "frontend-dev-variables" # Para DEV
  - group: "frontend-qa-variables" # Para QA
  - group: "frontend-prod-variables" # Para PROD
```

## 📋 Template de Variables

### Valores Sugeridos para DEV

```bash
TAG_IMAGE_DEV=dev-latest
NODE_ENV_DEV=development
PORT_DEV=3000
VITE_API_BASE_URL_DEV=https://api-dev.tudominio.com/api
VITE_API_TIMEOUT_DEV=10000
VITE_JWT_SECRET_DEV=tu-secret-key-desarrollo-super-seguro
VITE_JWT_EXPIRES_IN_DEV=24h
VITE_ENABLE_INACTIVITY_TIMER_DEV=true
VITE_DEFAULT_INACTIVITY_TIME_DEV=600000
VITE_ENVIRONMENT_DEV=development
```

### Valores Sugeridos para QA

```bash
TAG_IMAGE_QA=qa-latest
NODE_ENV_QA=staging
PORT_QA=3000
VITE_API_BASE_URL_QA=https://api-qa.tudominio.com/api
VITE_API_TIMEOUT_QA=10000
VITE_JWT_SECRET_QA=tu-secret-key-qa-super-seguro
VITE_JWT_EXPIRES_IN_QA=24h
VITE_ENABLE_INACTIVITY_TIMER_QA=true
VITE_DEFAULT_INACTIVITY_TIME_QA=300000
VITE_ENVIRONMENT_QA=staging
```

### Valores Sugeridos para PROD

```bash
TAG_IMAGE_PROD=prod-latest
NODE_ENV_PROD=production
PORT_PROD=3000
VITE_API_BASE_URL_PROD=https://api.tudominio.com/api
VITE_API_TIMEOUT_PROD=15000
VITE_JWT_SECRET_PROD=tu-secret-key-produccion-ultra-seguro
VITE_JWT_EXPIRES_IN_PROD=12h
VITE_ENABLE_INACTIVITY_TIMER_PROD=true
VITE_DEFAULT_INACTIVITY_TIME_PROD=300000
VITE_ENVIRONMENT_PROD=production
```

## ⚠️ Notas de Seguridad

1. **JWT Secrets**: Usa secretos únicos y seguros para cada ambiente
2. **API Keys**: Nunca compartas las API keys en código fuente
3. **Variables Sensibles**: Marca como "secretas" las variables sensibles en Azure DevOps
4. **Rotación**: Cambia regularmente los secretos de producción

## 🔄 Actualización de Variables

Cuando se agreguen nuevas features que requieran variables de entorno:

1. Actualiza este documento
2. Actualiza el archivo `setup_env.sh`
3. Configura las variables en Azure DevOps
4. Prueba en DEV antes de implementar en QA/PROD
