# 📚 Guía de Endpoints - Spy x Family API

## 🚀 Servidor en Ejecución

- **Base URL**: `http://localhost:3000/api/v1`
- **Documentación HTML**: `http://localhost:3000`
- **Documentación JSON**: `http://localhost:3000/api/v1/Documentacion`

---

## 📺 TEMPORADAS

### Obtener todas las temporadas
```http
GET /api/v1/temporadas
```

**Respuesta exitosa (200)**:
```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

### Obtener temporada por ID
```http
GET /api/v1/temporadas/:id
```

### Obtener temporada por número
```http
GET /api/v1/temporadas/numero/:numero
```

### Obtener estadísticas de temporadas
```http
GET /api/v1/temporadas/estadisticas
```

### Crear nueva temporada
```http
POST /api/v1/temporadas
Content-Type: application/json
```

**Body**:
```json
{
  "numero_temporada": 4,
  "titulo": "Temporada 4",
  "descripcion": "Descripción de la temporada",
  "fecha_estreno": "2025-01-15",
  "numero_episodios": 12,
  "estudio_animacion": "Wit Studio, CloverWorks",
  "estado": "anunciada"
}
```

### Actualizar temporada
```http
PUT /api/v1/temporadas/:id
Content-Type: application/json
```

### Eliminar temporada
```http
DELETE /api/v1/temporadas/:id
```

---

## 🎬 EPISODIOS

### Obtener todos los episodios
```http
GET /api/v1/episodios
```

### Obtener episodio por ID
```http
GET /api/v1/episodios/:id
```

### Obtener episodios de una temporada
```http
GET /api/v1/episodios/temporada/:temporadaId
```

### Buscar episodios
```http
GET /api/v1/episodios/search?query=operacion
```

### Obtener estadísticas de episodios
```http
GET /api/v1/episodios/estadisticas
```

### Crear nuevo episodio
```http
POST /api/v1/episodios
Content-Type: application/json
```

**Body**:
```json
{
  "numero_episodio": 1,
  "titulo": "Nuevo episodio",
  "descripcion": "Descripción del episodio",
  "duracion_minutos": 24,
  "fecha_emision": "2025-04-15",
  "temporada_id": "698f12ad6aaa7ea7a9db4ff2"
}
```

### Actualizar episodio
```http
PUT /api/v1/episodios/:id
Content-Type: application/json
```

### Eliminar episodio
```http
DELETE /api/v1/episodios/:id
```

---

## 👥 PERSONAJES

### Obtener todos los personajes
```http
GET /api/v1/personajes
```

### Obtener personaje por ID
```http
GET /api/v1/personajes/:id
```

### Obtener personajes por rol
```http
GET /api/v1/personajes/rol/:rol
```
**Roles válidos**: `principal`, `secundario`, `recurrente`

**Ejemplo**:
```http
GET /api/v1/personajes/rol/principal
```

### Obtener personajes por organización
```http
GET /api/v1/personajes/organizacion/:organizacion
```

**Ejemplo**:
```http
GET /api/v1/personajes/organizacion/WISE
```

### Obtener personajes por habilidad
```http
GET /api/v1/personajes/habilidad/:habilidad
```

**Ejemplo**:
```http
GET /api/v1/personajes/habilidad/espionaje
```

### Buscar personajes
```http
GET /api/v1/personajes/search?query=twilight
```

### Obtener estadísticas de personajes
```http
GET /api/v1/personajes/estadisticas
```

### Crear nuevo personaje
```http
POST /api/v1/personajes
Content-Type: application/json
```

**Body**:
```json
{
  "nombre": "Nuevo Personaje",
  "alias": "Alias",
  "edad": 25,
  "rol": "secundario",
  "descripcion": "Descripción del personaje",
  "habilidades": ["Habilidad 1", "Habilidad 2"],
  "organizacion": "WISE"
}
```

### Actualizar personaje
```http
PUT /api/v1/personajes/:id
Content-Type: application/json
```

### Eliminar personaje
```http
DELETE /api/v1/personajes/:id
```

---

## 📖 TOMOS (MANGA)

### Obtener todos los tomos
```http
GET /api/v1/tomos
```

### Obtener tomo por ID
```http
GET /api/v1/tomos/:id
```

### Obtener tomo por número
```http
GET /api/v1/tomos/numero/:numero
```

**Ejemplo**:
```http
GET /api/v1/tomos/numero/5
```

### Obtener tomo por ISBN
```http
GET /api/v1/tomos/isbn/:isbn
```

**Ejemplo**:
```http
GET /api/v1/tomos/isbn/978-1974715657
```

### Obtener tomos por editorial
```http
GET /api/v1/tomos/editorial/:editorial
```

**Ejemplo**:
```http
GET /api/v1/tomos/editorial/Shueisha
```

### Obtener tomos por rango de fechas
```http
GET /api/v1/tomos/fechas?desde=2020-01-01&hasta=2021-12-31
```

### Buscar tomos
```http
GET /api/v1/tomos/search?query=vol
```

### Crear nuevo tomo
```http
POST /api/v1/tomos
Content-Type: application/json
```

**Body**:
```json
{
  "numero_tomo": 14,
  "titulo": "Spy x Family, Vol. 14",
  "isbn": "978-1974746543",
  "fecha_publicacion": "2024-01-05",
  "numero_capitulos": 5,
  "paginas": 200,
  "precio": 9.99,
  "editorial": "Shueisha"
}
```

### Actualizar tomo
```http
PUT /api/v1/tomos/:id
Content-Type: application/json
```

### Eliminar tomo
```http
DELETE /api/v1/tomos/:id
```

---

## 🔧 Ejemplos de Uso con PowerShell

### GET - Obtener recursos
```powershell
# Obtener todas las temporadas
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/temporadas" -Method GET

# Obtener personajes principales
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/personajes/rol/principal" -Method GET

# Buscar episodios
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/episodios/search?query=strix" -Method GET
```

### POST - Crear recurso
```powershell
$body = @{
    nombre = "Test Personaje"
    rol = "secundario"
    descripcion = "Un personaje de prueba"
    habilidades = @("Test")
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/personajes" -Method POST -Body $body -ContentType "application/json"
```

### PUT - Actualizar recurso
```powershell
$body = @{
    estado = "emitida"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/v1/temporadas/ID_AQUI" -Method PUT -Body $body -ContentType "application/json"
```

### DELETE - Eliminar recurso
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/personajes/ID_AQUI" -Method DELETE
```

---

## 📊 Estructura de Respuestas

### Respuesta exitosa
```json
{
  "success": true,
  "data": {...},
  "message": "Mensaje descriptivo" // Opcional
}
```

### Respuesta con lista
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Respuesta de error
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": ["Lista de errores"] // Opcional
}
```

---

## 📝 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error de validación |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🗄️ Datos Actuales en la Base de Datos

- **3 Temporadas** (Temporada 1, 2 y 3)
- **25 Episodios** (12 de temporada 1, 13 de temporada 2)
- **15 Personajes** (Loid, Yor, Anya, Bond, Damian, Becky, etc.)
- **13 Tomos** del manga (Vol. 1 al 13)

---

## 🎯 Próximos Pasos

1. ✅ Todos los endpoints están funcionando
2. ✅ Base de datos poblada con datos reales
3. 🔜 Implementar autenticación (opcional)
4. 🔜 Agregar paginación a endpoints GET
5. 🔜 Crear frontend (Angular/React)
6. 🔜 Desplegar en producción

---

## 🐛 Solución de Problemas

### El servidor no inicia
```powershell
cd backend
npm start
```

### Error de conexión a MongoDB
- Verifica que tu firewall (Norton) no esté bloqueando la conexión
- Verifica que el archivo `.env` tenga la cadena de conexión correcta

### Error 404 en endpoints
- Verifica que el servidor esté corriendo en el puerto 3000
- Revisa que la URL esté correctamente escrita
- Consulta `/api/v1/Documentacion` para ver todos los endpoints disponibles

---

**¡API lista para usar! 🎉**
