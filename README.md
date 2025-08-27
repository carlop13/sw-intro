# 📋 Administrador de Tareas - PWA

Este proyecto es una **Aplicación Web Progresiva (PWA)** desarrollada con **React** y **Vite**, que permite a los usuarios gestionar sus tareas de manera eficiente incluso sin conexión a internet, gracias a la integración de un **Service Worker**.

## 🚀 Características

- ✅ Crear, editar y eliminar tareas  
- 📌 Marcar tareas como completadas o pendientes  
- 🔄 Sincronización automática cuando hay conexión  
- 📱 Instalación como aplicación en dispositivos móviles y escritorio  
- ⚡ Rendimiento optimizado con Vite  
- 🔒 Archivos cacheados para funcionar offline  

## 🛠️ Tecnologías utilizadas

- [React](https://react.dev/)  
- [Vite](https://vitejs.dev/)  
- [Service Worker](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)  
- [Workbox](https://developer.chrome.com/docs/workbox) *(opcional para manejo de caché avanzado)*  

## 🌐 PWA y Service Worker

Este proyecto incluye un Service Worker registrado automáticamente para:
- Cachear los assets estáticos (HTML, CSS, JS e íconos).
- Permitir acceso offline a la aplicación.
- Mantener actualizado el contenido en segundo plano.