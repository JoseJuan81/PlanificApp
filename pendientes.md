## Pantalla de Actividades Jerarquizadas
### **UI**
- [x] Quitar botones de Jerarquía y Lista (encima de listado) 
- [x] Agregar tipo de monedas en secciones **Presupuesto** y **Gastos**
- [x] Crear actividades con gastos, presupuestos y lista de tareas.
- [x] Crear fragment en graphql para actividades.
- [x] Borrar formulario al crear actividad
- [ ] Ícono para indicar subactividades en listado
- [ ] Manejo de errores
- [ ] Loading
- [ ] Implementar multiselector para sub actividades
- [ ] Maquetar buscador de actividades
- [ ] Definir cómo se mostrará planificación de tiempo ejecución en listado jerárquico.
- [ ] Auto scroll en formulario de nueva actividad cuando el campo está oculto y se hace `focus` on it.
- [ ] Diseño móvil
- [ ] Manejo de errores

### **GraphQl Server**
- [x] Actualizar una actividad
- [x] Eliminar actividad de base de datos
- [x] Al crear actividades verificar se existen `subTasks` para actualizar el `parentTaskId`
- [x] Crear servicio de actividades anidadas
- [ ] Implementar throttle para cuidar servidor: https://www.apollographql.com/docs/link/links/rest/#options
- [ ] Eliminar actividad lógicamente - Usar plugin global
- [ ] Implementar servicio de búsqueda de actividades

### **Despliegue**
- [x] Desplegar en netlify
- [ ] Probar solución propuesta en foro de netlify para corregir errores en despliegue

### **Pruebas**
- [x] Barra de navegación 
- [x] Duración de una actividad: funcionalidad para calcular fechas con duración o duración a partir de fechas
- [x] Igual a anterior pero con hora
- [ ] prueba en función que generará listado de jerarquías
- [ ] Instalar `vue add cypress-experimental` para pruebas en componentes de vue.js
- [ ] Implementar pruebas unitarias en componente **NewTask**: Comprobar integridad objecto `newTask` al crearse el componente y al enviarse la data