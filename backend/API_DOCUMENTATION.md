# 📖 Documentación Completa de la API - Spy x Family Database

## Información General

**Base URL:** `http://localhost:3000/api/v1`

**Formato de Respuesta:** JSON

**Content-Type:** `application/json`

---

## 📑 Índice

1. [Endpoint de Documentación](#endpoint-de-documentación)
2. [Temporadas](#temporadas)
3. [Episodios](#episodios)
4. [Personajes](#personajes)
5. [Tomos del Manga](#tomos-del-manga)
6. [Códigos de Estado HTTP](#códigos-de-estado-http)
7. [Estructura de Respuestas](#estructura-de-respuestas)

---

## Endpoint de Documentación

### **GET** `/Documentacion`

Obtiene información general sobre la API y listado de endpoints disponibles.

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "API REST - Spy x Family Database",
  "version": "1.0.0",
  "endpoints": {
    "temporadas": [
      "GET /api/v1/temporadas/get/all",
      "GET /api/v1/temporadas/get/:id",
      "POST /api/v1/temporadas/post",
      "PUT /api/v1/temporadas/update/:id",
      "DELETE /api/v1/temporadas/delete/:id"
    ],
    "episodios": [
      "GET /api/v1/episodios/get/all",
      "GET /api/v1/episodios/get/:id",
      "GET /api/v1/episodios/get/temporada/:temporada_id",
      "POST /api/v1/episodios/post",
      "PUT /api/v1/episodios/update/:id",
      "DELETE /api/v1/episodios/delete/:id"
    ],
    "personajes": [
      "GET /api/v1/personajes/get/all",
      "GET /api/v1/personajes/get/:id",
      "GET /api/v1/personajes/get/rol/:rol",
      "POST /api/v1/personajes/post",
      "PUT /api/v1/personajes/update/:id",
      "DELETE /api/v1/personajes/delete/:id"
    ],
    "tomos": [
      "GET /api/v1/tomos/get/all",
      "GET /api/v1/tomos/get/:id",
      "POST /api/v1/tomos/post",
      "PUT /api/v1/tomos/update/:id",
      "DELETE /api/v1/tomos/delete/:id"
    ]
  }
}
```

---

## 📺 TEMPORADAS

### **GET** `/temporadas/get/all`

Obtiene todas las temporadas con soporte de paginación.

#### Query Parameters

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `page` | Number | No | 1 | Número de página |
| `limit` | Number | No | 10 | Elementos por página |

#### Ejemplo de Request
```http
GET /api/v1/temporadas/get/all?page=1&limit=10
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "numero_temporada": 1,
      "titulo": "Temporada 1",
      "descripcion": "La familia Forger comienza su misión de infiltración...",
      "fecha_estreno": "2022-04-09T00:00:00.000Z",
      "fecha_finalizacion": "2022-06-25T00:00:00.000Z",
      "numero_episodios": 12,
      "estudio_animacion": "Wit Studio, CloverWorks",
      "estado": "emitida",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "numero_temporada": 2,
      "titulo": "Temporada 2",
      "descripcion": "La familia Forger enfrenta nuevos desafíos...",
      "fecha_estreno": "2022-10-01T00:00:00.000Z",
      "fecha_finalizacion": "2022-12-24T00:00:00.000Z",
      "numero_episodios": 13,
      "estudio_animacion": "Wit Studio, CloverWorks",
      "estado": "emitida",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}
```

#### Respuestas de Error

**500 Internal Server Error** - Error del servidor
```json
{
  "success": false,
  "message": "Error al obtener las temporadas",
  "error": "Connection to database failed"
}
```

---

### **GET** `/temporadas/get/:id`

Obtiene una temporada específica por su ID.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID de la temporada (ObjectId de MongoDB) |

#### Ejemplo de Request
```http
GET /api/v1/temporadas/get/507f1f77bcf86cd799439011
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "numero_temporada": 1,
    "titulo": "Temporada 1",
    "descripcion": "La familia Forger comienza su misión de infiltración para la Operación Strix.",
    "fecha_estreno": "2022-04-09T00:00:00.000Z",
    "fecha_finalizacion": "2022-06-25T00:00:00.000Z",
    "numero_episodios": 12,
    "estudio_animacion": "Wit Studio, CloverWorks",
    "estado": "emitida",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found** - Temporada no existe
```json
{
  "success": false,
  "message": "Temporada no encontrada"
}
```

**400 Bad Request** - ID inválido
```json
{
  "success": false,
  "message": "ID de temporada inválido",
  "error": "Cast to ObjectId failed"
}
```

**500 Internal Server Error** - Error del servidor
```json
{
  "success": false,
  "message": "Error al obtener la temporada",
  "error": "Database error"
}
```

---

### **POST** `/temporadas/post`

Crea una nueva temporada.

#### Body Parameters

| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| `numero_temporada` | Number | Sí | min: 1, único | Número de la temporada |
| `titulo` | String | Sí | min: 3, max: 100 | Título de la temporada |
| `descripcion` | String | Sí | min: 10 | Descripción/sinopsis |
| `fecha_estreno` | Date | Sí | formato ISO 8601 | Fecha de estreno |
| `fecha_finalizacion` | Date | No | formato ISO 8601 | Fecha de finalización |
| `numero_episodios` | Number | Sí | min: 1 | Total de episodios |
| `estudio_animacion` | String | Sí | min: 3 | Estudio de animación |
| `estado` | String | Sí | enum: ['emitida', 'en emisión', 'anunciada'] | Estado de la temporada |

#### Ejemplo de Request
```http
POST /api/v1/temporadas/post
Content-Type: application/json

{
  "numero_temporada": 3,
  "titulo": "Temporada 3",
  "descripcion": "La familia Forger continúa sus aventuras mientras Anya avanza en su educación en Eden Academy.",
  "fecha_estreno": "2024-04-13",
  "fecha_finalizacion": null,
  "numero_episodios": 12,
  "estudio_animacion": "Wit Studio, CloverWorks",
  "estado": "en emisión"
}
```

#### Respuesta de Éxito (201 Created)
```json
{
  "success": true,
  "message": "Temporada creada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "numero_temporada": 3,
    "titulo": "Temporada 3",
    "descripcion": "La familia Forger continúa sus aventuras...",
    "fecha_estreno": "2024-04-13T00:00:00.000Z",
    "fecha_finalizacion": null,
    "numero_episodios": 12,
    "estudio_animacion": "Wit Studio, CloverWorks",
    "estado": "en emisión",
    "createdAt": "2024-02-11T00:00:00.000Z",
    "updatedAt": "2024-02-11T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Error de validación
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El número de temporada es requerido",
    "El título debe tener al menos 3 caracteres",
    "El estado debe ser: emitida, en emisión o anunciada"
  ]
}
```

**409 Conflict** - Temporada duplicada
```json
{
  "success": false,
  "message": "Ya existe una temporada con ese número",
  "error": "Duplicate key error"
}
```

**500 Internal Server Error** - Error del servidor
```json
{
  "success": false,
  "message": "Error al crear la temporada",
  "error": "Database connection lost"
}
```

---

### **PUT** `/temporadas/update/:id`

Actualiza una temporada existente (actualización parcial permitida).

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID de la temporada a actualizar |

#### Body Parameters (Todos opcionales)

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `numero_temporada` | Number | min: 1, único | Número de la temporada |
| `titulo` | String | min: 3, max: 100 | Título de la temporada |
| `descripcion` | String | min: 10 | Descripción/sinopsis |
| `fecha_estreno` | Date | formato ISO 8601 | Fecha de estreno |
| `fecha_finalizacion` | Date | formato ISO 8601 | Fecha de finalización |
| `numero_episodios` | Number | min: 1 | Total de episodios |
| `estudio_animacion` | String | min: 3 | Estudio de animación |
| `estado` | String | enum: ['emitida', 'en emisión', 'anunciada'] | Estado |

#### Ejemplo de Request
```http
PUT /api/v1/temporadas/update/507f1f77bcf86cd799439015
Content-Type: application/json

{
  "estado": "emitida",
  "fecha_finalizacion": "2024-07-06",
  "numero_episodios": 12
}
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Temporada actualizada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "numero_temporada": 3,
    "titulo": "Temporada 3",
    "estado": "emitida",
    "fecha_finalizacion": "2024-07-06T00:00:00.000Z",
    "numero_episodios": 12,
    "updatedAt": "2024-07-07T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found** - Temporada no existe
```json
{
  "success": false,
  "message": "Temporada no encontrada"
}
```

**400 Bad Request** - Validación fallida
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El estado debe ser: emitida, en emisión o anunciada",
    "El número de episodios debe ser al menos 1"
  ]
}
```

**409 Conflict** - Conflicto de unicidad
```json
{
  "success": false,
  "message": "Ya existe una temporada con ese número",
  "error": "Duplicate key error"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al actualizar la temporada",
  "error": "Database error"
}
```

---

### **DELETE** `/temporadas/delete/:id`

Elimina una temporada. No se puede eliminar si tiene episodios asociados.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID de la temporada a eliminar |

#### Ejemplo de Request
```http
DELETE /api/v1/temporadas/delete/507f1f77bcf86cd799439015
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Temporada eliminada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "numero_temporada": 3,
    "titulo": "Temporada 3"
  }
}
```

#### Respuestas de Error

**404 Not Found** - Temporada no existe
```json
{
  "success": false,
  "message": "Temporada no encontrada"
}
```

**409 Conflict** - Tiene episodios asociados
```json
{
  "success": false,
  "message": "No se puede eliminar la temporada porque tiene episodios asociados",
  "error": "Referential integrity violation"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al eliminar la temporada",
  "error": "Database error"
}
```

---

## 📺 EPISODIOS

### **GET** `/episodios/get/all`

Obtiene todos los episodios con paginación y filtros opcionales.

#### Query Parameters

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `page` | Number | No | 1 | Número de página |
| `limit` | Number | No | 10 | Elementos por página |
| `temporada` | String | No | - | ID de temporada para filtrar |

#### Ejemplo de Request
```http
GET /api/v1/episodios/get/all?page=1&limit=20
GET /api/v1/episodios/get/all?temporada=507f1f77bcf86cd799439011
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "temporada_id": "507f1f77bcf86cd799439011",
      "numero_episodio": 1,
      "numero_episodio_global": 1,
      "titulo": "Operación Strix",
      "sinopsis": "El espía conocido como Twilight recibe una nueva misión: formar una familia falsa para infiltrarse en una escuela de élite.",
      "fecha_emision": "2022-04-09T00:00:00.000Z",
      "duracion": 24,
      "visualizaciones": 5000000,
      "puntuacion": 9.5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Parámetros inválidos
```json
{
  "success": false,
  "message": "Parámetros de consulta inválidos",
  "error": "page must be a positive number"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener los episodios",
  "error": "Database error"
}
```

---

### **GET** `/episodios/get/:id`

Obtiene un episodio específico por su ID.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del episodio |

#### Ejemplo de Request
```http
GET /api/v1/episodios/get/507f1f77bcf86cd799439020
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "temporada_id": "507f1f77bcf86cd799439011",
    "numero_episodio": 1,
    "numero_episodio_global": 1,
    "titulo": "Operación Strix",
    "sinopsis": "El espía conocido como Twilight recibe una nueva misión...",
    "fecha_emision": "2022-04-09T00:00:00.000Z",
    "duracion": 24,
    "visualizaciones": 5000000,
    "puntuacion": 9.5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Episodio no encontrado"
}
```

**400 Bad Request** - ID inválido
```json
{
  "success": false,
  "message": "ID de episodio inválido",
  "error": "Cast to ObjectId failed"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener el episodio",
  "error": "Database error"
}
```

---

### **GET** `/episodios/get/temporada/:temporada_id`

Obtiene todos los episodios de una temporada específica.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `temporada_id` | String | ID de la temporada |

#### Ejemplo de Request
```http
GET /api/v1/episodios/get/temporada/507f1f77bcf86cd799439011
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "numero_episodio": 1,
      "numero_episodio_global": 1,
      "titulo": "Operación Strix",
      "sinopsis": "El espía conocido como Twilight...",
      "fecha_emision": "2022-04-09T00:00:00.000Z",
      "duracion": 24
    },
    {
      "_id": "507f1f77bcf86cd799439021",
      "numero_episodio": 2,
      "numero_episodio_global": 2,
      "titulo": "Asegurar a un Hijo",
      "sinopsis": "Loid busca una niña para adoptar...",
      "fecha_emision": "2022-04-16T00:00:00.000Z",
      "duracion": 24
    }
  ],
  "total": 12
}
```

#### Respuestas de Error

**404 Not Found** - Temporada no existe
```json
{
  "success": false,
  "message": "Temporada no encontrada"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener los episodios de la temporada",
  "error": "Database error"
}
```

---

### **POST** `/episodios/post`

Crea un nuevo episodio.

#### Body Parameters

| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| `temporada_id` | String | Sí | ObjectId válido existente | ID de la temporada |
| `numero_episodio` | Number | Sí | min: 1, único por temporada | Número del episodio en la temporada |
| `numero_episodio_global` | Number | Sí | min: 1, único global | Número del episodio en toda la serie |
| `titulo` | String | Sí | min: 3, max: 150 | Título del episodio |
| `sinopsis` | String | Sí | min: 10 | Sinopsis/resumen del episodio |
| `fecha_emision` | Date | Sí | formato ISO 8601 | Fecha de emisión |
| `duracion` | Number | Sí | min: 1, max: 120 | Duración en minutos |
| `visualizaciones` | Number | No | min: 0 | Número de visualizaciones |
| `puntuacion` | Number | No | min: 0, max: 10 | Puntuación del episodio |

#### Ejemplo de Request
```http
POST /api/v1/episodios/post
Content-Type: application/json

{
  "temporada_id": "507f1f77bcf86cd799439011",
  "numero_episodio": 1,
  "numero_episodio_global": 1,
  "titulo": "Operación Strix",
  "sinopsis": "El espía conocido como Twilight recibe una misión crucial: infiltrarse en una prestigiosa escuela formando una familia falsa.",
  "fecha_emision": "2022-04-09",
  "duracion": 24,
  "visualizaciones": 5000000,
  "puntuacion": 9.5
}
```

#### Respuesta de Éxito (201 Created)
```json
{
  "success": true,
  "message": "Episodio creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "temporada_id": "507f1f77bcf86cd799439011",
    "numero_episodio": 1,
    "numero_episodio_global": 1,
    "titulo": "Operación Strix",
    "sinopsis": "El espía conocido como Twilight...",
    "fecha_emision": "2022-04-09T00:00:00.000Z",
    "duracion": 24,
    "visualizaciones": 5000000,
    "puntuacion": 9.5,
    "createdAt": "2024-02-11T00:00:00.000Z",
    "updatedAt": "2024-02-11T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Validación fallida
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El título es requerido y debe tener al menos 3 caracteres",
    "La sinopsis debe tener al menos 10 caracteres",
    "La duración debe estar entre 1 y 120 minutos",
    "La puntuación debe estar entre 0 y 10"
  ]
}
```

**404 Not Found** - Temporada no existe
```json
{
  "success": false,
  "message": "La temporada especificada no existe",
  "error": "temporada_id not found"
}
```

**409 Conflict** - Número de episodio duplicado
```json
{
  "success": false,
  "message": "Ya existe un episodio con ese número en esta temporada",
  "error": "Duplicate episode number"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al crear el episodio",
  "error": "Database error"
}
```

---

### **PUT** `/episodios/update/:id`

Actualiza un episodio existente (actualización parcial permitida).

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del episodio a actualizar |

#### Body Parameters (Todos opcionales)

| Campo | Tipo | Validación | Descripción |
|-------|------|------------|-------------|
| `temporada_id` | String | ObjectId válido | ID de la temporada |
| `numero_episodio` | Number | min: 1 | Número del episodio |
| `numero_episodio_global` | Number | min: 1 | Número global |
| `titulo` | String | min: 3, max: 150 | Título |
| `sinopsis` | String | min: 10 | Sinopsis |
| `fecha_emision` | Date | formato ISO 8601 | Fecha de emisión |
| `duracion` | Number | min: 1, max: 120 | Duración en minutos |
| `visualizaciones` | Number | min: 0 | Visualizaciones |
| `puntuacion` | Number | min: 0, max: 10 | Puntuación |

#### Ejemplo de Request
```http
PUT /api/v1/episodios/update/507f1f77bcf86cd799439020
Content-Type: application/json

{
  "visualizaciones": 6000000,
  "puntuacion": 9.7
}
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Episodio actualizado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "titulo": "Operación Strix",
    "visualizaciones": 6000000,
    "puntuacion": 9.7,
    "updatedAt": "2024-02-12T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Episodio no encontrado"
}
```

**400 Bad Request**
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "La puntuación debe estar entre 0 y 10"
  ]
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al actualizar el episodio",
  "error": "Database error"
}
```

---

### **DELETE** `/episodios/delete/:id`

Elimina un episodio.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del episodio a eliminar |

#### Ejemplo de Request
```http
DELETE /api/v1/episodios/delete/507f1f77bcf86cd799439020
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Episodio eliminado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "titulo": "Operación Strix"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Episodio no encontrado"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al eliminar el episodio",
  "error": "Database error"
}
```

---

## 👥 PERSONAJES

### **GET** `/personajes/get/all`

Obtiene todos los personajes con paginación y filtros opcionales.

#### Query Parameters

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `page` | Number | No | 1 | Número de página |
| `limit` | Number | No | 10 | Elementos por página |
| `rol` | String | No | - | Filtrar por rol (principal/secundario/recurrente) |
| `organizacion` | String | No | - | Filtrar por organización |
| `activo` | Boolean | No | - | Filtrar por estado activo |

#### Ejemplo de Request
```http
GET /api/v1/personajes/get/all?page=1&limit=20
GET /api/v1/personajes/get/all?rol=principal
GET /api/v1/personajes/get/all?organizacion=WISE
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "nombre": "Loid Forger",
      "alias": "Twilight",
      "edad": 27,
      "genero": "masculino",
      "descripcion": "Espía de élite de WISE conocido como el mejor agente de Westalis...",
      "rol": "principal",
      "ocupacion": "Psiquiatra (tapadera), Espía",
      "organizacion": "WISE",
      "familia": "Familia Forger",
      "habilidades": [
        "Espionaje",
        "Disfraces",
        "Combate cuerpo a cuerpo",
        "Conocimiento de 6 idiomas",
        "Análisis psicológico"
      ],
      "primera_aparicion": "Episodio 1",
      "imagen_url": "https://example.com/loid.jpg",
      "activo": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439031",
      "nombre": "Yor Forger",
      "alias": "Thorn Princess",
      "edad": 27,
      "genero": "femenino",
      "descripcion": "Asesina de élite de Garden conocida como la Princesa de las Espinas...",
      "rol": "principal",
      "ocupacion": "Oficinista (tapadera), Asesina",
      "organizacion": "Garden",
      "familia": "Familia Forger",
      "habilidades": [
        "Combate cuerpo a cuerpo",
        "Armas blancas",
        "Velocidad sobrehumana",
        "Fuerza sobrehumana"
      ],
      "primera_aparicion": "Episodio 2",
      "imagen_url": "https://example.com/yor.jpg",
      "activo": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Filtros inválidos
```json
{
  "success": false,
  "message": "Parámetros de filtro inválidos",
  "error": "rol must be one of: principal, secundario, recurrente"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener los personajes",
  "error": "Database error"
}
```

---

### **GET** `/personajes/get/:id`

Obtiene un personaje específico por su ID con toda su información detallada.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del personaje |

#### Ejemplo de Request
```http
GET /api/v1/personajes/get/507f1f77bcf86cd799439030
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "nombre": "Loid Forger",
    "alias": "Twilight",
    "edad": 27,
    "genero": "masculino",
    "descripcion": "Espía de élite de WISE conocido como el mejor agente de Westalis. Su misión actual es infiltrarse en Eden Academy para acercarse a Donovan Desmond, pero para ello debe formar una familia falsa. A pesar de su profesionalismo, comienza a desarrollar sentimientos genuinos por su familia artificial.",
    "rol": "principal",
    "ocupacion": "Psiquiatra (tapadera), Espía",
    "organizacion": "WISE",
    "familia": "Familia Forger",
    "habilidades": [
      "Espionaje",
      "Disfraces",
      "Combate cuerpo a cuerpo",
      "Conocimiento de 6 idiomas",
      "Análisis psicológico",
      "Cocina",
      "Deportes"
    ],
    "primera_aparicion": "Episodio 1",
    "imagen_url": "https://example.com/loid-forger.jpg",
    "activo": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Personaje no encontrado"
}
```

**400 Bad Request** - ID inválido
```json
{
  "success": false,
  "message": "ID de personaje inválido",
  "error": "Cast to ObjectId failed"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener el personaje",
  "error": "Database error"
}
```

---

### **GET** `/personajes/get/rol/:rol`

Obtiene todos los personajes filtrados por rol.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `rol` | String | Rol del personaje: `principal`, `secundario`, `recurrente` |

#### Ejemplo de Request
```http
GET /api/v1/personajes/get/rol/principal
GET /api/v1/personajes/get/rol/secundario
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "nombre": "Loid Forger",
      "alias": "Twilight",
      "rol": "principal",
      "familia": "Familia Forger"
    },
    {
      "_id": "507f1f77bcf86cd799439031",
      "nombre": "Yor Forger",
      "alias": "Thorn Princess",
      "rol": "principal",
      "familia": "Familia Forger"
    },
    {
      "_id": "507f1f77bcf86cd799439032",
      "nombre": "Anya Forger",
      "alias": "Sujeto 007",
      "rol": "principal",
      "familia": "Familia Forger"
    }
  ],
  "total": 3
}
```

#### Respuestas de Error

**400 Bad Request** - Rol inválido
```json
{
  "success": false,
  "message": "Rol inválido. Debe ser: principal, secundario o recurrente",
  "error": "Invalid rol parameter"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener personajes por rol",
  "error": "Database error"
}
```

---

### **POST** `/personajes/post`

Crea un nuevo personaje.

#### Body Parameters

| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| `nombre` | String | Sí | min: 2, max: 100 | Nombre real del personaje |
| `alias` | String | No | max: 100 | Nombre en clave o apodo |
| `edad` | Number | No | min: 0, max: 150 | Edad del personaje |
| `genero` | String | No | enum: ['masculino', 'femenino', 'otro'] | Género |
| `descripcion` | String | Sí | min: 10 | Descripción completa |
| `rol` | String | Sí | enum: ['principal', 'secundario', 'recurrente'] | Rol del personaje |
| `ocupacion` | String | No | max: 200 | Ocupación del personaje |
| `organizacion` | String | No | max: 100 | Organización a la que pertenece |
| `familia` | String | No | max: 100 | Familia a la que pertenece |
| `habilidades` | Array[String] | No | - | Lista de habilidades |
| `primera_aparicion` | String | No | max: 100 | Episodio/capítulo de primera aparición |
| `imagen_url` | String | No | URL válida | URL de imagen del personaje |
| `activo` | Boolean | No | - | Si está activo en la trama |

#### Ejemplo de Request
```http
POST /api/v1/personajes/post
Content-Type: application/json

{
  "nombre": "Bond Forger",
  "alias": "Sujeto 8",
  "edad": 3,
  "genero": "masculino",
  "descripcion": "Perro con habilidades precognitivas que fue rescatado del Proyecto Apple. Adoptado por la familia Forger, puede ver el futuro inmediato y es muy leal a Anya.",
  "rol": "principal",
  "ocupacion": "Mascota de la familia",
  "organizacion": "Ninguna (ex-Proyecto Apple)",
  "familia": "Familia Forger",
  "habilidades": [
    "Precognición",
    "Olfato agudo",
    "Inteligencia superior"
  ],
  "primera_aparicion": "Episodio 15",
  "imagen_url": "https://example.com/bond.jpg",
  "activo": true
}
```

#### Respuesta de Éxito (201 Created)
```json
{
  "success": true,
  "message": "Personaje creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439035",
    "nombre": "Bond Forger",
    "alias": "Sujeto 8",
    "edad": 3,
    "genero": "masculino",
    "descripcion": "Perro con habilidades precognitivas...",
    "rol": "principal",
    "ocupacion": "Mascota de la familia",
    "organizacion": "Ninguna (ex-Proyecto Apple)",
    "familia": "Familia Forger",
    "habilidades": [
      "Precognición",
      "Olfato agudo",
      "Inteligencia superior"
    ],
    "primera_aparicion": "Episodio 15",
    "imagen_url": "https://example.com/bond.jpg",
    "activo": true,
    "createdAt": "2024-02-11T00:00:00.000Z",
    "updatedAt": "2024-02-11T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Validación fallida
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El nombre es requerido y debe tener al menos 2 caracteres",
    "La descripción debe tener al menos 10 caracteres",
    "El rol debe ser: principal, secundario o recurrente",
    "El rol es obligatorio"
  ]
}
```

**409 Conflict** - Personaje duplicado
```json
{
  "success": false,
  "message": "Ya existe un personaje con ese nombre",
  "error": "Duplicate personaje name"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al crear el personaje",
  "error": "Database error"
}
```

---

### **PUT** `/personajes/update/:id`

Actualiza un personaje existente (actualización parcial permitida).

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del personaje a actualizar |

#### Body Parameters (Todos opcionales)

Los mismos campos que en POST, todos opcionales.

#### Ejemplo de Request
```http
PUT /api/v1/personajes/update/507f1f77bcf86cd799439035
Content-Type: application/json

{
  "activo": true,
  "habilidades": [
    "Precognición",
    "Olfato agudo",
    "Inteligencia superior",
    "Rescate"
  ]
}
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Personaje actualizado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439035",
    "nombre": "Bond Forger",
    "habilidades": [
      "Precognición",
      "Olfato agudo",
      "Inteligencia superior",
      "Rescate"
    ],
    "activo": true,
    "updatedAt": "2024-02-12T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Personaje no encontrado"
}
```

**400 Bad Request**
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El rol debe ser: principal, secundario o recurrente"
  ]
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al actualizar el personaje",
  "error": "Database error"
}
```

---

### **DELETE** `/personajes/delete/:id`

Elimina un personaje.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del personaje a eliminar |

#### Ejemplo de Request
```http
DELETE /api/v1/personajes/delete/507f1f77bcf86cd799439035
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Personaje eliminado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439035",
    "nombre": "Bond Forger"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Personaje no encontrado"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al eliminar el personaje",
  "error": "Database error"
}
```

---

## 📘 TOMOS DEL MANGA

### **GET** `/tomos/get/all`

Obtiene todos los tomos del manga con paginación y filtros opcionales.

#### Query Parameters

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `page` | Number | No | 1 | Número de página |
| `limit` | Number | No | 10 | Elementos por página |
| `disponible` | Boolean | No | - | Filtrar por disponibilidad |

#### Ejemplo de Request
```http
GET /api/v1/tomos/get/all?page=1&limit=20
GET /api/v1/tomos/get/all?disponible=true
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "numero_tomo": 1,
      "titulo": "Tomo 1",
      "fecha_publicacion": "2019-07-04T00:00:00.000Z",
      "descripcion": "Comienza la Operación Strix. Twilight debe formar una familia falsa...",
      "isbn": "978-8411015868",
      "numero_capitulos": 5,
      "editorial": "Shueisha",
      "precio": 7.95,
      "portada_url": "https://example.com/tomo1.jpg",
      "paginas": 200,
      "disponible": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439041",
      "numero_tomo": 2,
      "titulo": "Tomo 2",
      "fecha_publicacion": "2019-10-04T00:00:00.000Z",
      "descripcion": "Anya comienza sus clases en Eden Academy...",
      "isbn": "978-8411015875",
      "numero_capitulos": 5,
      "editorial": "Shueisha",
      "precio": 7.95,
      "portada_url": "https://example.com/tomo2.jpg",
      "paginas": 192,
      "disponible": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 13,
    "pages": 1
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Parámetros inválidos
```json
{
  "success": false,
  "message": "Parámetros de consulta inválidos",
  "error": "disponible must be a boolean"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener los tomos",
  "error": "Database error"
}
```

---

### **GET** `/tomos/get/:id`

Obtiene un tomo específico por su ID.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del tomo |

#### Ejemplo de Request
```http
GET /api/v1/tomos/get/507f1f77bcf86cd799439040
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439040",
    "numero_tomo": 1,
    "titulo": "Tomo 1",
    "fecha_publicacion": "2019-07-04T00:00:00.000Z",
    "descripcion": "Comienza la Operación Strix. El espía Twilight debe formar una familia falsa para infiltrarse en Eden Academy y acercarse a Donovan Desmond. Adopta a Anya, una niña telépata, y contrata a Yor como esposa falsa.",
    "isbn": "978-8411015868",
    "numero_capitulos": 5,
    "editorial": "Shueisha",
    "precio": 7.95,
    "portada_url": "https://example.com/spyxfamily-tomo1.jpg",
    "paginas": 200,
    "disponible": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Tomo no encontrado"
}
```

**400 Bad Request** - ID inválido
```json
{
  "success": false,
  "message": "ID de tomo inválido",
  "error": "Cast to ObjectId failed"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al obtener el tomo",
  "error": "Database error"
}
```

---

### **POST** `/tomos/post`

Crea un nuevo tomo del manga.

#### Body Parameters

| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| `numero_tomo` | Number | Sí | min: 1, único | Número del tomo |
| `titulo` | String | Sí | min: 3, max: 150 | Título del tomo |
| `fecha_publicacion` | Date | Sí | formato ISO 8601, >= 2019 | Fecha de publicación |
| `descripcion` | String | Sí | min: 10 | Descripción del contenido |
| `isbn` | String | Sí | formato ISBN válido, único | ISBN del tomo |
| `numero_capitulos` | Number | Sí | min: 1 | Cantidad de capítulos |
| `editorial` | String | Sí | min: 3 | Editorial |
| `precio` | Number | No | min: 0 | Precio del tomo |
| `portada_url` | String | No | URL válida | URL de la portada |
| `paginas` | Number | No | min: 1 | Número de páginas |
| `disponible` | Boolean | No | - | Disponibilidad para venta |

#### Ejemplo de Request
```http
POST /api/v1/tomos/post
Content-Type: application/json

{
  "numero_tomo": 13,
  "titulo": "Tomo 13",
  "fecha_publicacion": "2023-11-02",
  "descripcion": "Nuevas misiones y desafíos para la familia Forger. Anya participa en competencias escolares mientras Loid y Yor enfrentan amenazas a su tapadera.",
  "isbn": "978-8411015950",
  "numero_capitulos": 5,
  "editorial": "Shueisha",
  "precio": 8.95,
  "portada_url": "https://example.com/tomo13.jpg",
  "paginas": 205,
  "disponible": true
}
```

#### Respuesta de Éxito (201 Created)
```json
{
  "success": true,
  "message": "Tomo creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "numero_tomo": 13,
    "titulo": "Tomo 13",
    "fecha_publicacion": "2023-11-02T00:00:00.000Z",
    "descripcion": "Nuevas misiones y desafíos...",
    "isbn": "978-8411015950",
    "numero_capitulos": 5,
    "editorial": "Shueisha",
    "precio": 8.95,
    "portada_url": "https://example.com/tomo13.jpg",
    "paginas": 205,
    "disponible": true,
    "createdAt": "2024-02-11T00:00:00.000Z",
    "updatedAt": "2024-02-11T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**400 Bad Request** - Validación fallida
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El número de tomo es requerido y debe ser al menos 1",
    "El título debe tener entre 3 y 150 caracteres",
    "La descripción debe tener al menos 10 caracteres",
    "El ISBN es requerido y debe ser válido",
    "La fecha de publicación no puede ser anterior a 2019"
  ]
}
```

**409 Conflict** - ISBN duplicado
```json
{
  "success": false,
  "message": "Ya existe un tomo con ese ISBN",
  "error": "Duplicate ISBN"
}
```

**409 Conflict** - Número de tomo duplicado
```json
{
  "success": false,
  "message": "Ya existe un tomo con ese número",
  "error": "Duplicate tomo number"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al crear el tomo",
  "error": "Database error"
}
```

---

### **PUT** `/tomos/update/:id`

Actualiza un tomo existente (actualización parcial permitida).

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del tomo a actualizar |

#### Body Parameters (Todos opcionales)

Los mismos campos que en POST, todos opcionales.

#### Ejemplo de Request
```http
PUT /api/v1/tomos/update/507f1f77bcf86cd799439050
Content-Type: application/json

{
  "precio": 9.95,
  "disponible": true,
  "portada_url": "https://example.com/tomo13-updated.jpg"
}
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Tomo actualizado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "numero_tomo": 13,
    "titulo": "Tomo 13",
    "precio": 9.95,
    "disponible": true,
    "portada_url": "https://example.com/tomo13-updated.jpg",
    "updatedAt": "2024-02-12T00:00:00.000Z"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Tomo no encontrado"
}
```

**400 Bad Request** - Validación fallida
```json
{
  "success": false,
  "message": "Error de validación",
  "errors": [
    "El precio debe ser un número positivo",
    "La URL de portada no es válida"
  ]
}
```

**409 Conflict** - ISBN duplicado
```json
{
  "success": false,
  "message": "Ya existe otro tomo con ese ISBN",
  "error": "Duplicate ISBN"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al actualizar el tomo",
  "error": "Database error"
}
```

---

### **DELETE** `/tomos/delete/:id`

Elimina un tomo del manga.

#### Parámetros de URL

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id` | String | ID del tomo a eliminar |

#### Ejemplo de Request
```http
DELETE /api/v1/tomos/delete/507f1f77bcf86cd799439050
```

#### Respuesta de Éxito (200 OK)
```json
{
  "success": true,
  "message": "Tomo eliminado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439050",
    "numero_tomo": 13,
    "titulo": "Tomo 13"
  }
}
```

#### Respuestas de Error

**404 Not Found**
```json
{
  "success": false,
  "message": "Tomo no encontrado"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Error al eliminar el tomo",
  "error": "Database error"
}
```

---

## 📋 Códigos de Estado HTTP

| Código | Significado | Uso en la API |
|--------|-------------|---------------|
| **200** | OK | Operación exitosa (GET, PUT, DELETE) |
| **201** | Created | Recurso creado exitosamente (POST) |
| **400** | Bad Request | Error de validación o parámetros inválidos |
| **404** | Not Found | Recurso no encontrado |
| **409** | Conflict | Conflicto de unicidad (duplicados) |
| **500** | Internal Server Error | Error del servidor o base de datos |

---

## 📦 Estructura de Respuestas

### Respuesta de Éxito

Todas las respuestas exitosas incluyen:

```json
{
  "success": true,
  "message": "Mensaje descriptivo (opcional)",
  "data": {
    // Datos del recurso o array de recursos
  },
  "pagination": {
    // Solo en endpoints con paginación
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Respuesta de Error

Todas las respuestas de error incluyen:

```json
{
  "success": false,
  "message": "Mensaje descriptivo del error",
  "error": "Detalle técnico del error (opcional)",
  "errors": [
    // Array de errores de validación (cuando aplica)
    "Error de validación 1",
    "Error de validación 2"
  ]
}
```

---

## 🔐 Notas de Seguridad

- Todos los endpoints aceptan y devuelven JSON
- Se recomienda usar HTTPS en producción
- Validar siempre la entrada del usuario en el cliente
- Los timestamps se devuelven en formato ISO 8601
- Los ObjectId de MongoDB tienen 24 caracteres hexadecimales

---

## 👨‍💻 Ejemplos de Uso con cURL

### Obtener todas las temporadas
```bash
curl -X GET "http://localhost:3000/api/v1/temporadas/get/all?page=1&limit=10"
```

### Crear un nuevo personaje
```bash
curl -X POST "http://localhost:3000/api/v1/personajes/post" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Damian Desmond",
    "edad": 6,
    "rol": "secundario",
    "descripcion": "Hijo de Donovan Desmond y compañero de clase de Anya"
  }'
```

### Actualizar un episodio
```bash
curl -X PUT "http://localhost:3000/api/v1/episodios/update/507f1f77bcf86cd799439020" \
  -H "Content-Type: application/json" \
  -d '{
    "puntuacion": 9.8
  }'
```

### Eliminar un tomo
```bash
curl -X DELETE "http://localhost:3000/api/v1/tomos/delete/507f1f77bcf86cd799439050"
```

---

## 📞 Soporte

Para reportar problemas o sugerencias sobre la API, contactar a: [tu-email@example.com]

---

**Última actualización:** Febrero 11, 2026  
**Versión de la API:** 1.0.0
