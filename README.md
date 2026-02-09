# API REST - Spy x Family Database

## Descripción del Proyecto
API REST pública que centraliza y proporciona información completa y estructurada sobre la serie **Spy x Family**, permitiendo a desarrolladores integrar datos de personajes, misiones, episodios y relaciones de la serie en sus aplicaciones sin necesidad de gestionar bases de datos locales.

---

## 🎯 Problema que Resuelve

Actualmente, los desarrolladores que desean crear aplicaciones (webs, bots, aplicaciones, extensiones) relacionadas con Spy x Family enfrentan varios desafíos:

1. **Duplicación de esfuerzos**: Cada desarrollador debe recopilar, estructurar y mantener los mismos datos manualmente
2. **Almacenamiento local innecesario**: Ocupar espacio y recursos gestionando bases de datos locales con información que raramente cambia
3. **Inconsistencia de datos**: Diferentes fuentes pueden tener información desactualizada o contradictorias
4. **Tiempo de desarrollo**: Gran parte del tiempo se invierte en la recopilación de datos en lugar del desarrollo de funcionalidades

Esta API resuelve estos problemas actuando como **fuente única de verdad centralizada y actualizada**.

---

## 📖 Descripción Funcional

### Propósito
Proporcionar una API REST que permita a desarrolladores acceder instantáneamente a información detallada y estructurada de Spy x Family mediante peticiones HTTP simples, eliminando la necesidad de gestionar datos localmente.

### Características Principales

**🔌 Plug & Play**
- Integración inmediata en cualquier aplicación mediante peticiones HTTP
- Sin necesidad de configurar bases de datos locales
- Endpoints intuitivos y bien documentados

**🎨 Casos de Uso**
- Aplicaciones web tipo Wiki o enciclopedia de fans
- Aplicaciones móviles con información de personajes y episodios
- Bots de Discord/Telegram con datos de la serie
- Juegos o cuestionarios interactivos
- Extensiones de navegador temáticas
- Proyectos educativos y portfolios de desarrolladores

**⚡ Ventajas Técnicas**
- **Rendimiento optimizado**: Datos servidos desde una única fuente con indexación eficiente
- **Escalabilidad**: Miles de aplicaciones pueden consumir la API sin duplicar infraestructura
- **Mantenimiento centralizado**: Actualizaciones y correcciones se reflejan automáticamente en todas las apps que consumen la API
- **Reducción de costos**: No hay necesidad de mantener servidores o bases de datos propias para datos estáticos
- **Disponibilidad 24/7**: Acceso permanente a los datos sin preocuparse por caídas de servicio local
- **Formato estandarizado**: Respuestas JSON consistentes y fáciles de parsear

**📊 Datos Disponibles**
- Personajes (nombre, edad, habilidades, afiliaciones, relaciones)
- Misiones y operaciones
- Episodios y capítulos
- Organizaciones (WISE, Garden, SSS)
- Relaciones entre personajes
- Estadísticas y fechas importantes

---


## 🗄️ Modelo de Datos

La base de datos está estructurada en múltiples colecciones que organizan la información del universo de Spy x Family de manera relacional y eficiente.

---

### 📺 ANIME

#### **Colección: `anime`**
```javascript
{
  _id: ObjectId,
  titulo: String,                    // Título del anime
  descripcion: String,               // Sinopsis general
  estudio_animacion: String,         // Estudio productor (ej: Wit Studio, CloverWorks)
  fecha_estreno: Date,               // Fecha de primera emisión
  temporadas: Number,                // Número de temporadas
  createdAt: Date,
  updatedAt: Date
}
```

#### **Colección: `episodios_anime`**
```javascript
{
  _id: ObjectId,
  anime_id: ObjectId,                // FK -> anime
  numero_episodio: Number,           // Número del episodio
  titulo: String,                    // Título del episodio
  sinopsis: String,                  // Resumen del episodio
  fecha_emision: Date,               // Fecha de emisión
  duracion: Number,                  // Duración en minutos
  createdAt: Date,
  updatedAt: Date
}
```

---

### 📘 MANGA

#### **Colección: `manga`**
```javascript
{
  _id: ObjectId,
  titulo: String,                    // Título del manga
  descripcion: String,               // Sinopsis general
  editorial: String,                 // Editorial (ej: Shueisha)
  fecha_inicio_publicacion: Date,    // Fecha de primera publicación
  createdAt: Date,
  updatedAt: Date
}
```

#### **Colección: `tomos_manga`**
```javascript
{
  _id: ObjectId,
  manga_id: ObjectId,                // FK -> manga
  numero_tomo: Number,               // Número del tomo
  titulo: String,                    // Título del tomo
  fecha_publicacion: Date,           // Fecha de publicación
  descripcion: String,               // Descripción del contenido
  isbn: String,                      // ISBN del tomo
  numero_capitulos: Number,          // Cantidad de capítulos en el tomo
  createdAt: Date,
  updatedAt: Date
}
```

#### **Colección: `capitulos_manga`**
```javascript
{
  _id: ObjectId,
  tomo_id: ObjectId,                 // FK -> tomos_manga
  numero_capitulo: Number,           // Número del capítulo
  titulo: String,                    // Título del capítulo
  resumen_detallado: String,         // Resumen completo de lo que sucede
  fecha_publicacion: Date,           // Fecha de publicación
  createdAt: Date,
  updatedAt: Date
}
```

---

### 👥 PERSONAJES

#### **Colección: `personajes`**
```javascript
{
  _id: ObjectId,
  nombre: String,                    // Nombre real (ej: Loid Forger)
  alias: String,                     // Nombre en clave (ej: Twilight)
  edad: Number,                      // Edad del personaje
  descripcion: String,               // Descripción del personaje
  rol: String,                       // "principal" | "secundario"
  familia: String,                   // Familia a la que pertenece (ej: Familia Forger)
  habilidades: [String],             // Array de habilidades especiales
  primera_aparicion: String,         // Capítulo/episodio donde aparece por primera vez
  createdAt: Date,
  updatedAt: Date
}
```

#### **Colección: `personajes_capitulos`** (Relación muchos-a-muchos)
```javascript
{
  _id: ObjectId,
  personaje_id: ObjectId,            // FK -> personajes
  capitulo_id: ObjectId,             // FK -> capitulos_manga
  createdAt: Date
}
```
*Esta colección permite rastrear en qué capítulos aparece cada personaje.*

---

### ✍️ AUTORES Y PRODUCCIÓN

#### **Colección: `mangakas`**
```javascript
{
  _id: ObjectId,
  nombre: String,                    // Nombre del mangaka
  biografia: String,                 // Biografía del autor
  fecha_nacimiento: Date,            // Fecha de nacimiento
  pais: String,                      // País de origen
  createdAt: Date,
  updatedAt: Date
}
```

#### **Colección: `ayudantes`**
```javascript
{
  _id: ObjectId,
  nombre: String,                    // Nombre del ayudante
  especialidad: String,              // Especialidad (fondos, entintado, etc.)
  biografia: String,                 // Biografía del ayudante
  createdAt: Date,
  updatedAt: Date
}
```

#### **Colección: `manga_autores`** (Relación muchos-a-muchos)
```javascript
{
  _id: ObjectId,
  manga_id: ObjectId,                // FK -> manga
  mangaka_id: ObjectId,              // FK -> mangakas
  rol: String,                       // "autor principal" | "guionista" | etc.
  createdAt: Date
}
```

#### **Colección: `manga_ayudantes`** (Relación muchos-a-muchos)
```javascript
{
  _id: ObjectId,
  manga_id: ObjectId,                // FK -> manga
  ayudante_id: ObjectId,             // FK -> ayudantes
  periodo_participacion: String,     // Período en el que participó (ej: "2019-2021")
  createdAt: Date
}
```

---

### 📊 Diagrama de Relaciones

```
anime (1) ----< (N) episodios_anime

manga (1) ----< (N) tomos_manga (1) ----< (N) capitulos_manga

personajes (N) ----< personajes_capitulos >---- (N) capitulos_manga

manga (N) ----< manga_autores >---- (N) mangakas

manga (N) ----< manga_ayudantes >---- (N) ayudantes
```

---

## 📝 Reglas de Negocio

1. **[Regla 1]**: Descripción de la primera regla de negocio
2. **[Regla 2]**: Descripción de la segunda regla de negocio
3. **[Regla 3]**: Descripción de la tercera regla de negocio

*(Definir las reglas de negocio específicas de tu proyecto)*

---

## 🧪 Testing con Postman

Se recomienda probar todos los endpoints con Postman:
1. Importar la colección de Postman (si está disponible)
2. Configurar la variable de entorno `baseUrl` con `http://localhost:3000`
3. Probar cada endpoint del CRUD

---

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon

---

## 👥 Autor(es)
[Tu nombre aquí]

---

## 📄 Licencia
ISC


## 📋 Fase 1 - Backend

### Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor
- **Express**: Framework web minimalista para Node.js que facilita la creación de APIs REST
- **MongoDB**: Base de datos NoSQL orientada a documentos que almacena datos en formato JSON
- **Mongoose**: ODM (Object Document Mapper) para MongoDB
  - **¿Qué es un ODM?** Un ODM es una herramienta que permite mapear objetos de JavaScript a documentos de MongoDB. Actúa como una capa de abstracción que facilita la interacción con la base de datos, proporcionando validación de esquemas, tipado, consultas simplificadas y middleware para hooks de ciclo de vida. Es similar a un ORM (Object Relational Mapper) pero para bases de datos de documentos.

- **¿Qué es CORS?** CORS es un mecanismo de seguridad de los navegadores que controla qué dominios externos pueden acceder a los recursos de tu API. Por defecto, los navegadores bloquean peticiones HTTP desde un origen diferente al del servidor (por ejemplo, un frontend en `localhost:4200` haciendo peticiones a `localhost:3000`). El middleware CORS configura los headers HTTP necesarios para permitir estas peticiones entre diferentes orígenes, lo cual es esencial para que los frontends de Angular y React puedan consumir la API.
- **dotenv**: Librería para cargar variables de entorno desde un archivo `.env`, permitiendo mantener configuraciones sensibles fuera del código fuente

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-repositorio>
cd ApiSpyxFamily/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
   - Crear archivo `.env` en la raíz del backend
   - Configurar las siguientes variables:
```env
MONGODB_URI=mongodb://localhost:27017/nombre_base_datos
PORT=3000
NODE_ENV=development
```

4. **Iniciar el servidor**

Modo desarrollo (con nodemon):
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

El servidor estará corriendo en: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuración de la base de datos
│   ├── models/          # Modelos de Mongoose
│   ├── controllers/     # Controladores de la lógica de negocio
│   ├── routes/          # Definición de rutas
│   └── middlewares/     # Middlewares personalizados
├── app.js               # Configuración de Express
├── server.js            # Punto de entrada del servidor
├── .env                 # Variables de entorno (no subir a git)
├── .gitignore           # Archivos ignorados por git
└── package.json         # Dependencias del proyecto
```

---

## � Endpoints de la API

### Documentación
- **GET** `/api/v1/Documentacion` - Documentación completa de la API

---

### 📺 Anime
- **GET** `/api/v1/anime/get/all` - Obtener toda la información del anime (con paginación)
- **GET** `/api/v1/anime/get/:id` - Obtener información del anime por ID
- **POST** `/api/v1/anime/post` - Crear registro de anime
- **PUT** `/api/v1/anime/update/:id` - Actualizar información del anime
- **DELETE** `/api/v1/anime/delete/:id` - Eliminar registro del anime

### 📺 Episodios de Anime
- **GET** `/api/v1/episodios/get/all` - Obtener todos los episodios (con paginación)
- **GET** `/api/v1/episodios/get/:id` - Obtener un episodio por ID
- **GET** `/api/v1/episodios/get/anime/:anime_id` - Obtener episodios de un anime específico
- **POST** `/api/v1/episodios/post` - Crear nuevo episodio
- **PUT** `/api/v1/episodios/update/:id` - Actualizar información del episodio
- **DELETE** `/api/v1/episodios/delete/:id` - Eliminar episodio

---

### 📘 Manga
- **GET** `/api/v1/manga/get/all` - Obtener toda la información del manga
- **GET** `/api/v1/manga/get/:id` - Obtener información del manga por ID
- **POST** `/api/v1/manga/post` - Crear registro de manga
- **PUT** `/api/v1/manga/update/:id` - Actualizar información del manga
- **DELETE** `/api/v1/manga/delete/:id` - Eliminar registro del manga

### 📕 Tomos de Manga
- **GET** `/api/v1/tomos/get/all` - Obtener todos los tomos (con paginación)
- **GET** `/api/v1/tomos/get/:id` - Obtener un tomo por ID
- **GET** `/api/v1/tomos/get/manga/:manga_id` - Obtener tomos de un manga específico
- **POST** `/api/v1/tomos/post` - Crear nuevo tomo
- **PUT** `/api/v1/tomos/update/:id` - Actualizar información del tomo
- **DELETE** `/api/v1/tomos/delete/:id` - Eliminar tomo

### 📄 Capítulos de Manga
- **GET** `/api/v1/capitulos/get/all` - Obtener todos los capítulos (con paginación)
- **GET** `/api/v1/capitulos/get/:id` - Obtener un capítulo por ID
- **GET** `/api/v1/capitulos/get/tomo/:tomo_id` - Obtener capítulos de un tomo específico
- **POST** `/api/v1/capitulos/post` - Crear nuevo capítulo
- **PUT** `/api/v1/capitulos/update/:id` - Actualizar información del capítulo
- **DELETE** `/api/v1/capitulos/delete/:id` - Eliminar capítulo

---

### 👥 Personajes
- **GET** `/api/v1/personajes/get/all` - Obtener todos los personajes (con paginación)
- **GET** `/api/v1/personajes/get/:id` - Obtener un personaje por ID
- **GET** `/api/v1/personajes/get/rol/:rol` - Obtener personajes por rol (principal/secundario)
- **GET** `/api/v1/personajes/get/:id/capitulos` - Obtener capítulos donde aparece un personaje
- **POST** `/api/v1/personajes/post` - Crear nuevo personaje
- **PUT** `/api/v1/personajes/update/:id` - Actualizar información del personaje
- **DELETE** `/api/v1/personajes/delete/:id` - Eliminar personaje

---

### ✍️ Mangakas
- **GET** `/api/v1/mangakas/get/all` - Obtener todos los mangakas
- **GET** `/api/v1/mangakas/get/:id` - Obtener un mangaka por ID
- **POST** `/api/v1/mangakas/post` - Crear nuevo mangaka
- **PUT** `/api/v1/mangakas/update/:id` - Actualizar información del mangaka
- **DELETE** `/api/v1/mangakas/delete/:id` - Eliminar mangaka

### 👷 Ayudantes
- **GET** `/api/v1/ayudantes/get/all` - Obtener todos los ayudantes
- **GET** `/api/v1/ayudantes/get/:id` - Obtener un ayudante por ID
- **POST** `/api/v1/ayudantes/post` - Crear nuevo ayudante
- **PUT** `/api/v1/ayudantes/update/:id` - Actualizar información del ayudante
- **DELETE** `/api/v1/ayudantes/delete/:id` - Eliminar ayudante

---
