# Backend de Validación de Documentos de Identidad

Este proyecto es un backend desarrollado con NestJS y npm, diseñado para una prueba técnica que consume una API de validación de documentos de identidad. El backend expone tres endpoints principales:

1. **POST**: Inicia el flujo de validación.
2. **PUT**: Sube imágenes de los documentos.
3. **GET**: Verifica el estado de la solicitud.

## Requisitos Previos

- Node.js (versión 12 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/julians83/validate_backend
   cd validate_backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración

Antes de iniciar el servidor, configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
IDENTITY_VALIDATE_API_URL=tu_url_de_api
IDENTITY_VALIDATE_API_KEY=tu_clave_de_api
PORT=3001
```

## Ejecución del Servidor

Para iniciar el servidor en modo de desarrollo:

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3001`.

## Endpoints Disponibles

### 1. Iniciar Flujo de Validación

- **URL**: `/identity-validate/validate-document`
- **Método**: `POST`
- **Descripción**: Inicia el proceso de validación de un documento de identidad.

**Ejemplo de solicitud**:

```json
{
  "country": "CO",
  "document_type": "NATIONAL ID",
  "accountId": "123456",
  "type": "front"
}
```

**Respuesta exitosa (200 OK)**:

```json
{
  "validation_id": "abc123",
  "message": "Flujo de validación iniciado correctamente."
}
```

### 2. Subir Imagen del Documento

- **URL**: `/identity-validate/upload-image`
- **Método**: `PUT`
- **Descripción**: Sube la imagen del documento asociado al `validation_id`.

**Parámetros del cuerpo**:

- `url`: URL proporcionada para subir la imagen.

**Ejemplo de solicitud**:

- **Encabezados**:

  ```
  Content-Type: multipart/form-data
  ```

- **Cuerpo**: Archivo de imagen binario bajo el campo `file`.

**Respuesta exitosa (200 OK)**:

```json
{
  "message": "Imagen subida exitosamente"
}
```

### 3. Verificar Estado de la Solicitud

- **URL**: `/identity-validate/validations/:validationId`
- **Método**: `GET`
- **Descripción**: Consulta el estado actual de la validación.

**Parámetros de ruta**:

- `validationId`: ID de la validación.

**Respuesta exitosa (200 OK)**:

```json
{
  "validation_id": "abc123",
  "status": "pending",
  "message": "La validación está en proceso."
}
```

## Manejo de Errores

El backend maneja diferentes códigos de estado HTTP para indicar el resultado de las operaciones:

- `200 OK`: Operación exitosa.
- `400 Bad Request`: Solicitud malformada o datos inválidos.
- `404 Not Found`: Recurso no encontrado (por ejemplo, `validation_id` inexistente).
- `500 Internal Server Error`: Error interno del servidor.

## Documentación Adicional

Para más detalles sobre el uso de NestJS, consulta la [documentación oficial](https://docs.nestjs.com/).

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para más información. 