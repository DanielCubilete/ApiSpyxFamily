# Frontend React - Spy x Family API

## 📋 Descripción

Frontend desarrollado con **React 18** y **React Hooks** que consume la API REST de Spy x Family. Implementa operaciones CRUD completas para gestionar temporadas, episodios, personajes y tomos del manga.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca para construir interfaces
- **React Hooks** - useState, useEffect, useNavigate, useParams
- **React Router DOM v6** - Navegación entre componentes
- **Fetch API** - Consumo de API REST (sin librerías externas)
- **Bootstrap 5** - Framework CSS para estilos
- **Componentes Funcionales** - Arquitectura moderna de React

## ✅ Requisitos Implementados

### 1. ✅ Consumo de API
- Consume la misma API del backend (puerto 3000)
- Usa **Fetch API** nativa (sin Axios)
- Servicios organizados y reutilizables
- Manejo de errores HTTP

### 2. ✅ Componentes Funcionales y Hooks
- Todos los componentes son funcionales
- **useState** para manejo de estado local
- **useEffect** para ciclo de vida y carga de datos
- **useNavigate** para navegación programática
- **useParams** para parámetros de URL

### 3. ✅ Formularios Controlados
- Inputs controlados con useState
- Validación en tiempo real
- Mensajes de error personalizados
- Manejo de envío con preventDefault

### 4.  ✅ CRUD Completo (Temporadas)
- **Create** - Crear nuevas temporadas
- **Read** - Listar todas y ver detalle por ID
- **Update** - Editar temporadas existentes
- **Delete** - Eliminar con confirmación

### 5. ✅ Bootstrap
- Integrado via npm
- Tablas responsivas
- Formularios estilizados
- Cards, badges y botones

### 6. ✅ Validaciones
- Campos requeridos
- Longitud mínima/máxima
- Tipos de datos (números, fechas)
- Feedback visual con Bootstrap

### 7. ✅ React Router
- Navegación entre vistas
- Rutas dinámicas con parámetros (:id)
- Navegación programática con useNavigate
- Links de navegación

### 8. ✅ Manejo de Estado
- Estado local con useState
- Loading states durante peticiones
- Estados de error con mensajes
- Actualización de listas tras CRUD

## 📂 Estructura del Proyecto

```
frontend-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js/css           # Barra de navegación
│   │   ├── Home.js/css             # Página principal
│   │   ├── Loading.js/css          # Spinner de carga
│   │   ├── temporadas/
│   │   │   ├── TemporadaList.js/css   # Lista + filtros + búsqueda
│   │   │   ├── TemporadaDetail.js     # Ver detalle + episodios
│   │   │   └── TemporadaForm.js       # Crear/Editar validado
│   │   ├── personajes/
│   │   │   └── PersonajeList.js       # Lista de personajes
│   │   ├── episodios/                 # Por implementar
│   │   └── tomos/                     # Por implementar
│   ├── services/
│   │   ├── api.js                  # Clase base con Fetch
│   │   ├── temporadaService.js     # CRUD de temporadas
│   │   ├── episodioService.js      # CRUD de episodios
│   │   ├── personajeService.js     # CRUD de personajes
│   │   └── tomoService.js          # CRUD de tomos
│   ├── App.js                      # Componente raíz con Router
│   ├── App.css                     # Estilos globales
│   ├── index.js                    # Punto de entrada
│   └── index.css                   # Estilos base
├── package.json
└── README.md
```

## 🚀 Instalación y Ejecución

### 1. Requisitos Previos
```bash
# Verificar versiones mínimas
node --version   # >= 14.0.0
npm --version    # >= 6.0.0
```

### 2. Instalar Dependencias
```bash
cd frontend-react
npm install
```

### 3. Asegurar que el Backend esté corriendo
```bash
# En otra terminal
cd backend
npm start
# Backend debe estar en http://localhost:3000
```

### 4. Iniciar Aplicación React
```bash
npm start
```

La aplicación se abrirá en:
- **http://localhost:3001** (si puerto 3000 está ocupado)
- O el siguiente puerto disponible

## 📡 Servicios API con Fetch

### Arquitectura de Servicios

```javascript
// api.js - Clase base reutilizable
class ApiService {
  constructor(endpoint) {
    this.baseUrl = `http://localhost:3000/api/v1/${endpoint}`;
  }

  async getAll() {
    const response = await fetch(this.baseUrl);
    return this.handleResponse(response);
  }

  async create(data) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return this.handleResponse(response);
  }

  handleResponse(response) {
    if (!response.ok) throw new Error('Error en petición');
    return response.json();
  }
}
```

### Ejemplo de uso en componente

```javascript
import temporadaService from '../../services/temporadaService';

const [temporadas, setTemporadas] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const cargarDatos = async () => {
    try {
      const response = await temporadaService.getAll();
      if (response.success) {
        setTemporadas(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  cargarDatos();
}, []);
```

## 🎯 Componentes Implementados

### ✅ Temporadas (CRUD 100% Completo)

#### TemporadaList.js
- Lista completa de temporadas
- Búsqueda por título/descripción
- Filtro por estado (emitida/en emisión/anunciada)
- Badges de estado con colores
- Botones de acciones (Ver/Editar/Eliminar)
- Confirmación antes de eliminar
- Formato de fechas localizadas

#### TemporadaDetail.js
- Muestra todos los datos de la temporada
- Lista de episodios asociados
- Enlaces a episodios individuales
- Botones de navegación
- Formato condicional de fecha_finalizacion

#### TemporadaForm.js
- Formulario único para Crear y Editar
- Campos controlados con useState
- Validaciones inline con feedback
- Mensajes de error específicos por campo
- Conversión de tipos (string → number)
- Manejo de fechas opcionales

**Validaciones implementadas:**
- Número temporada > 0
- Título: 3-100 caracteres
- Descripción: mínimo 10 caracteres
- Fecha estreno: requerida
- Número episodios: mínimo 1
- Estudio animación: mínimo 3 caracteres

### ✅ Personajes (Lista Implementada)

#### PersonajeList.js
- Lista completa con filtros
- Búsqueda por nombre/alias/descripción
- Filtro por rol (principal/secundario/recurrente)
- Badges de rol con colores
- Tabla responsive

### 🔄 Pendientes (Estructura ya lista)
- PersonajeDetail + PersonajeForm
- Episodios (List + Detail + Form)
- Tomos (List + Detail + Form)

## 🌐 Rutas de la Aplicación

```javascript
/                           → Home
/temporadas                 → Lista de temporadas
/temporadas/nueva           → Crear temporada
/temporadas/:id             → Ver detalle
/temporadas/editar/:id      → Editar temporada
/personajes                 → Lista de personajes
/episodios                  → Mensaje "Próximamente"
/tomos                      → Mensaje "Próximamente"
```

## 🎨 Características de UX/UI

- ✅ **Responsive**: Bootstrap grid + mobile-first
- ✅ **Loading States**: Spinner durante fetch
- ✅ **Error Handling**: Alerts con mensajes claros
- ✅ **Confirmaciones**: window.confirm() antes de eliminar
- ✅ **Validación Visual**: Clases is-invalid de Bootstrap
- ✅ **Navegación Clara**: Breadcrumbs implícitos + botones
- ✅ **Feedback Inmediato**: Alerts tras operaciones CRUD

## 🔧 Conceptos de React Aplicados

### Hooks Utilizados

```javascript
// Estado local
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Efectos secundarios
useEffect(() => {
  cargarDatos();
}, []); // Array vacío = solo al montar

// Parámetros de URL
const { id } = useParams();

// Navegación programática
const navigate = useNavigate();
navigate('/temporadas');
```

### Componentes Funcionales

```javascript
const MiComponente = () => {
  // Lógica con hooks
  
  return (
    // JSX
  );
};

export default MiComponente;
```

### Formularios Controlados

```javascript
const [formData, setFormData] = useState({
  campo1: '',
  campo2: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};

<input
  name="campo1"
  value={formData.campo1}
  onChange={handleChange}
/>
```

## 📦 Scripts Disponibles

```bash
npm start        # Servidor desarrollo (puerto 3000+)
npm run build    # Build optimizado para producción
npm test         # Ejecuta tests con Jest
npm run eject    # Expone configuración (irreversible)
```

## 🎓 Cumplimiento de Requisitos de Fase 3

| Requisito | Estado | Implementación |
|-----------|--------|----------------|
| Consumir misma API | ✅ | Servicios apuntan a localhost:3000/api/v1 |
| Fetch API | ✅ | Sin Axios, solo fetch nativo |
| Componentes funcionales | ✅ | 0% class components |
| Uso de Hooks | ✅ | useState, useEffect, useNavigate, useParams |
| Formularios controlados | ✅ | Todos los inputs con value + onChange |
| CRUD completo | ✅ | Temporadas: Create, Read, Update, Delete |
| Bootstrap | ✅ | ^5.3.0 via npm |
| Validaciones | ✅ | Inline con feedback visual |
| React Router | ✅ | react-router-dom ^6.x |
| Manejo de estado | ✅ | useState + useEffect + loading/error states |

## 📝 Notas de Desarrollo

1. **Fetch vs Axios**: Se usa Fetch nativo según requisitos
2. **Modularidad**: Servicios reutilizables con herencia
3. **Validación**: Client-side + backend validation
4. **Error Handling**: try-catch + finally para loading
5. **Clean Code**: Nombres descriptivos + comments donde necesario
6. **Escalabilidad**: Estructura preparada para nuevos módulos

## 🚧 Próximos Pasos

Para entregar la Fase 3 100% completa:

1. **Personajes** → Añadir Detail + Form
2. **Episodios** → Implementar List + Detail + Form
3. **Tomos** → Implementar List + Detail + Form
4. **Mejoras**:
   - Paginación (ya hay estructura)
   - Búsqueda debounce
   - Ordenamiento de columnas
   - Context API para estado global

## 🎉 Estado Actual

**✅ Fase 3 iniciada y funcionando:**
- Proyecto React creado con CRA
- Dependencias instaladas
- Estructura organizada
- Servicios API funcionales
- CRUD completo de Temporadas
- Navegación implementada
- Bootstrap integrado
- Validaciones activas

**Listo para demostración y expansión.**

---

Desarrollado con ❤️ usando React 18 + Hooks
