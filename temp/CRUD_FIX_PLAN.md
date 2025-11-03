# 🔧 Plan Completo para Arreglar CRUD - Fuentes de Datos Incorrectas

## 🔍 Problema Identificado
Los datos vuelven a los originales (John Doe) después de editar o importar. Esto indica que hay componentes usando fuentes de datos incorrectas o el estado no se está actualizando correctamente.

## 📋 Checklist de Componentes a Revisar

### ✅ Ya Verificados y Correctos
- [x] `useCVData.ts` - Hook centralizado ✅
- [x] `Index.tsx` - Usa `useCVData` correctamente ✅
- [x] `CVSettings.tsx` - Usa `updateCvData` directamente ✅

### ⚠️ Componentes a Verificar

#### 1. **ProfileContext.tsx** ⚠️
**Problema Actual:**
```typescript
const updateCvData = (data: any) => {
  setCvData(data); // Esto está bien ahora
};
```

**Posible Problema:**
- El estado inicial usa `defaultCvData` que nunca cambia
- Cuando se actualiza, puede que React no detecte el cambio si la referencia es la misma

**Solución:**
```typescript
const updateCvData = (data: any) => {
  if (!data || typeof data !== 'object') {
    console.error('Invalid CV data:', data);
    return;
  }
  
  // Forzar nueva referencia para que React detecte el cambio
  setCvData({ ...data });
};
```

#### 2. **EditableText.tsx** ⚠️
**Verificar:**
- ¿Usa el valor del prop correctamente?
- ¿El estado local se sincroniza con el prop?
- ¿Llama a `onSave` correctamente?

**Posible Problema:**
```typescript
const [editValue, setEditValue] = useState(value);
// Si 'value' cambia, editValue no se actualiza
```

**Solución Necesaria:**
```typescript
useEffect(() => {
  setEditValue(value);
}, [value]);
```

#### 3. **EditableList.tsx** ⚠️
**Verificar:**
- ¿Sincroniza el estado local con los props?
- ¿Llama a `onSave` con los datos correctos?

**Posible Problema:**
```typescript
const [editItems, setEditItems] = useState(items);
// Si 'items' cambia, editItems no se actualiza
```

**Solución Necesaria:**
```typescript
useEffect(() => {
  if (!isEditing) {
    setEditItems(items);
  }
}, [items, isEditing]);
```

#### 4. **JobExperience.tsx** ⚠️
**Verificar:**
- ¿Pasa correctamente los valores a EditableText/EditableList?
- ¿El callback `onUpdate` se llama correctamente?

#### 5. **CVHeader.tsx** ⚠️
**Verificar:**
- ¿Usa los valores de los props correctamente?
- ¿Llama a `onUpdate` correctamente?

## 🎯 Plan de Acción Paso a Paso

### Paso 1: Arreglar ProfileContext
```typescript
// Asegurar que siempre crea una nueva referencia
const updateCvData = (data: any) => {
  if (!data || typeof data !== 'object') {
    console.error('Invalid CV data:', data);
    return;
  }
  setCvData({ ...data });
};
```

### Paso 2: Arreglar EditableText
```typescript
// Añadir useEffect para sincronizar con prop
useEffect(() => {
  setEditValue(value);
}, [value]);
```

### Paso 3: Arreglar EditableList
```typescript
// Ya tiene useEffect pero verificar que funciona
useEffect(() => {
  if (!isEditing) {
    setEditItems(items);
  }
}, [items, isEditing]);
```

### Paso 4: Verificar Flujo de Datos
```
User Edit
   ↓
EditableText/EditableList (estado local)
   ↓
onSave callback
   ↓
JobExperience.onUpdate
   ↓
Index.updateExperience
   ↓
useCVData.updateExperience
   ↓
useCVData.updateLanguageSection
   ↓
ProfileContext.updateCvData
   ↓
setCvData (nueva referencia)
   ↓
React re-render
   ↓
Componentes reciben nuevos props
   ↓
useEffect sincroniza estado local
```

## 🔨 Implementación

### Archivo 1: ProfileContext.tsx
```typescript
const updateCvData = (data: any) => {
  if (!data || typeof data !== 'object') {
    console.error('Invalid CV data:', data);
    return;
  }
  
  // Crear nueva referencia para forzar re-render
  setCvData({ ...data });
};
```

### Archivo 2: EditableText.tsx
```typescript
const EditableText = ({ value, onSave, className = "", multiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);

  // CRÍTICO: Sincronizar con prop cuando cambia
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // ... resto del código
};
```

### Archivo 3: EditableList.tsx
```typescript
// Ya tiene el useEffect, solo verificar que está correcto
useEffect(() => {
  if (!isEditing) {
    setEditItems(items);
  }
}, [items, isEditing]);
```

## 🧪 Testing Plan

### Test 1: Importar PDF
1. Importar PDF con datos nuevos
2. Verificar que los datos se muestran correctamente
3. Editar un campo
4. Verificar que el cambio persiste
5. ✅ PASS si los datos no vuelven a John Doe

### Test 2: Editar Experiencia
1. Editar título de trabajo
2. Guardar
3. Verificar que el cambio se muestra
4. Editar otro campo
5. ✅ PASS si el primer cambio sigue ahí

### Test 3: Mover Experiencias
1. Mover una experiencia hacia arriba
2. Verificar que el orden cambió
3. Editar la experiencia movida
4. ✅ PASS si los datos son correctos

### Test 4: Añadir Experiencia
1. Añadir nueva experiencia
2. Editar los campos de la nueva experiencia
3. Verificar que los cambios persisten
4. ✅ PASS si no se pierde la nueva experiencia

## 🎯 Resultado Esperado

Después de implementar todas las correcciones:
- ✅ Los datos importados persisten
- ✅ Las ediciones se guardan correctamente
- ✅ Mover experiencias funciona sin perder datos
- ✅ Añadir experiencias funciona correctamente
- ✅ No hay reversión a datos de John Doe
- ✅ Todos los componentes usan el CRUD centralizado

## 📊 Verificación Final

```bash
# Checklist de verificación
[ ] ProfileContext crea nueva referencia en updateCvData
[ ] EditableText sincroniza estado con prop
[ ] EditableList sincroniza estado con prop
[ ] JobExperience pasa datos correctamente
[ ] CVHeader pasa datos correctamente
[ ] Index.tsx usa useCVData para todo
[ ] CVSettings.tsx usa updateCvData directamente
[ ] No hay imports de defaultCvData en componentes
[ ] No hay llamadas directas a setCvData fuera del contexto
```
