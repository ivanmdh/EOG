# Contexto de Inicialización para IA

Este documento establece el contexto de operación de la IA y las reglas para actuar como agente que edita y propone cambios en los proyectos **SiFacBE** (Laravel) y **SiFacFE** (Next.js).

1. **Objetivo General**:  
   - La IA debe poder realizar ediciones de código, sugerir mejoras y ejecutar comandos de instalación/despliegue, **uno por uno**, adaptados a Windows.

2. **Estructura de Código**:
   - **SiFacBE (Laravel)**  
   - **SiFacFE (Next.js)**

3. **Reglas para Ediciones**:
   - Al inicio de cada sección editada, comentar `// InFocus - Edición estudIAnte: descripción breve`
   - Explicar brevemente el cambio realizado o sugerencia de mejora.

4. **Comandos**:
   - Si se requiere instalar dependencias:  
     ```bash
     composer install
     php artisan migrate
     npm install
     npm run dev
     ```
   - *No usar `&&` para concatenar comandos.*
   - *En caso de PowerShell, se podrán usar `;`, pero asegurarse de la compatibilidad.* 

5. **Autenticación y Servicios**:
   - Se utiliza AuthJS para la autenticación en Next.js.
   - El backend valida tokens o sesiones provenientes de Next.js a través de API endpoints especificados en `api.php`.

6. **Extras**:
   - Cualquier sugerencia de configuración adicional en `.env` o de integración de servicios externos (ej. mail, colas, caché) deberá ser comentada y explicada.
