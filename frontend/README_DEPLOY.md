# Deploy Angular en Vercel con API externa

## Configuración de la API

- En producción (Vercel), la app Angular se conecta a la API pública:
  - https://api-spyx-family.vercel.app/api/v1
- En desarrollo local, usa `/api/v1` y el proxy/rewrite de Vercel redirige a la API remota.
- Los servicios Angular detectan automáticamente si están en Vercel y usan la URL correcta.

## Archivo `vercel.json`

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://api-spyx-family.vercel.app/api/$1" }
  ],
  "outputDirectory": "dist/frontend"
}
```

## Pasos para desplegar

1. Ejecuta `ng build --output-path=dist/frontend` para generar la build.
2. Sube el proyecto a Vercel (puedes usar el dashboard o CLI).
3. La app funcionará automáticamente con la API remota.

## Notas
- No incluyas credenciales sensibles en el frontend.
- Si necesitas variables de entorno, usa el dashboard de Vercel para configurarlas.
