# 📖 INSTRUCCIONES PARA CONTINUAR CON LA FASE 1

## ✅ Instalación Completada

Se han instalado exitosamente las siguientes dependencias:

### Dependencias Principales:
- **express** (^5.2.1) - Framework web para Node.js
- **mongoose** (^9.1.6) - ODM para MongoDB
- **cors** (^2.8.6) - Middleware para CORS
- **dotenv** (^17.2.4) - Gestión de variables de entorno

### Dependencias de Desarrollo:
- **nodemon** (^3.1.11) - Reinicio automático del servidor

---

## 📁 Estructura Creada

```
backend/
├── src/
│   ├── config/
│   │   └── database.js               ✅ Configuración de MongoDB
│   ├── models/
│   │   └── ejemplo.model.js          📝 Plantilla de modelo
│   ├── controllers/
│   │   └── ejemplo.controller.js     📝 Plantilla de controlador
│   ├── routes/
│   │   └── ejemplo.routes.js         📝 Plantilla de rutas
│   └── middlewares/
│       └── errorHandler.js           ✅ Middleware de errores
├── app.js                            ✅ Configuración de Express
├── server.js                         ✅ Servidor principal
├── .env                              ✅ Variables de entorno
├── .gitignore                        ✅ Archivos a ignorar
└── package.json                      ✅ Dependencias del proyecto
```

---

## 🚀 Próximos Pasos

### 1. Definir tu Tema del Proyecto
Elige un tema para tu proyecto (Biblioteca, Tienda online, Gestión de cursos, etc.)
- Nombre del proyecto: _______________
- Recurso principal: _______________

### 2. Configurar MongoDB
Edita el archivo `.env` y configura la URI de MongoDB:
```env
# Si usas MongoDB local:
MONGODB_URI=mongodb://localhost:27017/nombre_tu_base_datos

# Si usas MongoDB Atlas:
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_base_datos
```

### 3. Crear tu Modelo de Datos
1. Copia `src/models/ejemplo.model.js`
2. Renómbralo según tu recurso (ej: `pelicula.model.js`)
3. Define los campos según tu entidad:
   - nombre/título (String, requerido)
   - descripción (String)
   - campo numérico (Number)
   - campo fecha (Date)
   - campo booleano (Boolean)
   - timestamps (createdAt, updatedAt) ✅ Ya incluido

### 4. Crear tu Controlador
1. Copia `src/controllers/ejemplo.controller.js`
2. Renómbralo según tu recurso (ej: `pelicula.controller.js`)
3. Importa tu modelo
4. Implementa las reglas de negocio (mínimo 3)

### 5. Crear tus Rutas
1. Copia `src/routes/ejemplo.routes.js`
2. Renómbralo según tu recurso (ej: `pelicula.routes.js`)
3. Importa tu controlador
4. Define los endpoints

### 6. Registrar las Rutas en app.js
Edita `app.js` e importa tus rutas:
```javascript
const ejemploRoutes = require('./src/routes/ejemplo.routes');

// Registrar rutas
app.use('/api/v1/ejemplo', ejemploRoutes);
```

### 7. Poblar la Base de Datos
Crea al menos 20 registros de prueba. Puedes:
- Usar MongoDB Compass
- Crear un script de seed
- Usar Postman para insertar datos

### 8. Probar con Postman
Prueba todos los endpoints:
- ✅ GET /api/v1/recurso/get/all (con paginación)
- ✅ GET /api/v1/recurso/get/:id
- ✅ POST /api/v1/recurso/post
- ✅ PUT /api/v1/recurso/update/:id
- ✅ DELETE /api/v1/recurso/delete/:id

---

## 🔧 Comandos Útiles

### Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

### Iniciar el servidor en modo producción:
```bash
npm start
```

### Ver documentación de la API:
```
http://localhost:3000/api/v1/Documentacion
```

---

## ⚠️ Checklist de la Fase 1

- [ ] Tema del proyecto definido
- [ ] MongoDB configurado y conectado
- [ ] Modelo(s) de datos creado(s)
- [ ] Controladores implementados
- [ ] Rutas definidas y registradas
- [ ] Reglas de negocio implementadas (mínimo 3)
- [ ] Base de datos poblada (mínimo 20 registros)
- [ ] Endpoints probados con Postman
- [ ] Documentación en README actualizada
- [ ] Código en repositorio GitHub

---

## 📚 Documentación Útil

- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Node.js](https://nodejs.org/docs/)

---

## 🆘 Problemas Comunes

### Error: Cannot connect to MongoDB
- Verifica que MongoDB esté corriendo
- Revisa la URI en el archivo `.env`
- Si usas MongoDB Atlas, verifica tu usuario y password

### Error: Port already in use
- Cambia el puerto en el archivo `.env`
- O cierra la aplicación que esté usando el puerto 3000

### Error de validación al crear recurso
- Verifica que estés enviando todos los campos requeridos
- Revisa el formato de los datos (números, fechas, etc.)

---

¡Éxito con tu proyecto! 🚀
