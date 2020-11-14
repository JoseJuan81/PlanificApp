## Pantalla de Actividades Jerarquizadas
### **UI**
- [x] Quitar botones de Jerarquía y Lista (encima de listado) 
- [ ] Implementar multiselector para sub actividades
- [ ] Maquetar buscador de actividades
- [x] Agregar tipo de monedas en secciones **Presupuesto** y **Gastos**
- [x] Crear actividades con gastos, presupuestos y lista de tareas.
- [ ] Definir cómo se mostrará planificación de tiempo ejecución en listado jerárquico.
- [ ] Auto scroll en formulario de nueva actividad cuando el campo está oculto y se hace `focus` on it.
- [ ] Diseño móvil

### **GraphQl Server**
- [ ] Crear fragment en graphql para actividades
- [ ] Crear servicio de actividades anidadas
- [ ] Implementar servicio de búsqueda de actividades

### **Despliegue**
- [x] Desplegar en netlify

### **Pruebas**
- [x] Barra de navegación 
- [x] Duración de una actividad: funcionalidad para calcular fechas con duración o duración a partir de fechas
- [x] Igual a anterior pero con hora
- [ ] Instalar `vue add cypress-experimental` para pruebas en componentes de vue.js
- [ ] Implementar pruebas unitarias en componente **NewTask**: Comprobar integridad objecto `newTask` al crearse el componente y al enviarse la data