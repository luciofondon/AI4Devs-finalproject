> Detalla en esta sección los prompts principales utilizados durante la creación del proyecto, que justifiquen el uso de asistentes de código en todas las fases del ciclo de vida del desarrollo. Esperamos un máximo de 3 por sección, principalmente los de creación inicial o  los de corrección o adición de funcionalidades que consideres más relevantes.
Puedes añadir adicionalmente la conversación completa como link o archivo adjunto si así lo consideras


## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 1. Descripción general del producto

**Prompt 1:**

Eres un experto PO en sofware de monitorización de dispositivos. Detalla la descripción de un sofware de monitorización de dispositivos y componentes embarcados en un autobus teniendo en cuenta las siguientes características:
- Un autobús tiene un pupitre que es controlado por el conductor del autobús.
- El pupitre tiene los componentes físicos: Lector QR, lector de tarjeta RFID, lector de tarjeta EMT, modem, impresora.
- Un autobús puede tener de 0 hasta 5 validadoras que están conectadas al pupitre.
- Las validadoras tienen un lector rfid y un lector de tarjeta EMV
- No se sabe el número de autobuses totales. 

El formato de exportación tiene que ser Markdown. 


**Prompt 2:**

Ten en cuenta que todos los dispositivos tienen un identificador único, incluido el autobús, las validadoras y el pupitre

**Prompt 3:**

- El autobús el identificador tiene el formato 1234
- El pupitre tiene el identificador PUP12345
- Las validadoras tienen el formato VAL12345
- Los componentes el formato puede variar porque depende del fabricante.



**Prompt 4:**

- El autobús puede tener 5 cámaras como máximo o ninguna.
- Los estados de los dispositivos son OK o KO
- El autobús puede tener el estado de OK, warning o KO.
- Las validadoras y pupitres pueden tener el estado de OK, warning o KO


**Prompt 5:**
Me podrías mostrar una descripción breve del proyecto en formato markdown. 
---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**

Teniendo en cuenta el @readme.md  me podrías definir un diagrama de arquitectura

**Prompt 2:**

Las tecnologías para el front será React con Typescript y en el back se desarrollará con NodeJS usando el framework NestJS

**Prompt 3:**

Ten en cuenta que el back para saber el estado de los diferentes autobuses lo obtendrá a través de una BD diferente a la del proyecto


### **2.2. Descripción de componentes principales:**



### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

**Prompt 1:**

Me podrías definir  una descripción a alto nivel del proyecto y una estructura de ficheros 


### **2.4. Infraestructura y despliegue**

**Prompt 1:**
Me podrías definir un diagrama de infrastructura del proyecto 

### **2.5. Seguridad**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.6. Tests**

**Prompt 1:**

Se ralizarán los test unitarios, test de componentes y test e2e utilizando cypress, me podrías hacer una descipción breve

---

### 3. Modelo de Datos

**Prompt 1:**

Me podrías definir en formato marmaid el diagrama del modelo de datos.


---

### 4. Especificación de la API

**Prompt 1:**

Me podrías definir como máximo 3 endpoint del backend hacia el front en formato OpenApi

**Prompt 2:**

La actualización de un componente no se podra hacer nunca desde el front


---

### 5. Historias de Usuario

**Prompt 1:**

Me podrías defrinir 3 historias de usuarios

**Prompt 2:**

La estimación de se realizará en cadena de Fibonacci


---

### 6. Tickets de Trabajo

**Prompt 1:**

Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto. 


**Prompt 2:**

**Prompt 3:**

---

### 7. Pull Requests

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**
