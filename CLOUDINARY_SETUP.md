# Configuración de Cloudinary para Música

## Pasos para configurar Cloudinary

### 1. Crear cuenta en Cloudinary
- Ve a [cloudinary.com](https://cloudinary.com) y crea una cuenta gratuita
- Obtendrás: `cloud_name`, `api_key`, y `api_secret`

### 2. Actualizar configuración
Edita el archivo `src/config/cloudinary.ts`:

```typescript
const CLOUDINARY_CONFIG = {
  cloud_name: 'tu-cloud-name-aqui',
  api_key: 'tu-api-key-aqui', 
  api_secret: 'tu-api-secret-aqui',
  secure: true
};
```

### 3. Subir archivos de audio
1. Ve a tu dashboard de Cloudinary
2. Sube tus archivos de audio a una carpeta llamada `wedding-music/`
3. Los archivos serán accesibles en URLs como:
   `https://res.cloudinary.com/tu-cloud-name/video/upload/v1/wedding-music/nombre-archivo.mp3`

### 4. Actualizar lista de canciones
En el mismo archivo `src/config/cloudinary.ts`, actualiza el array `MUSIC_TRACKS` con tus canciones:

```typescript
export const MUSIC_TRACKS = [
  {
    id: 'cancion-1',
    title: 'Tu Canción Favorita',
    url: `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloud_name}/video/upload/v1/wedding-music/cancion-1.mp3`
  },
  // Agrega más canciones aquí
];
```

## Archivos modificados

### Nuevos archivos:
- `src/config/cloudinary.ts` - Configuración y URLs de música
- `src/composables/useMusic.ts` - Composable para manejar música

### Archivos actualizados:
- `src/components/MusicPlayer.vue` - Ahora usa Cloudinary en lugar de archivos locales
- `package.json` - Agregada dependencia de cloudinary

## Código comentado
Todo el código relacionado con la carga de archivos locales ha sido comentado pero no eliminado, para facilitar la reversión si es necesario.

## Ventajas de Cloudinary
- ✅ Archivos servidos desde CDN (más rápido)
- ✅ No aumenta el tamaño del bundle de la aplicación
- ✅ Mejor rendimiento en producción
- ✅ Fácil administración de archivos multimedia
- ✅ Funciona sin problemas en servicios como Vercel