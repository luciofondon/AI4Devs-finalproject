
# Prompt 
Revisa el fichero @readme.md  y que este todo correcto 


# Prompt 
Quiero empezar a desarrollar el backend, me gustaría que me propusiese los pasos por los que podríamos comenzar 


# Prompt 
Todo lo relacionado con el backend lo haremos en una carpeta backend 


# Prompt 
Me gustaría empezar con el paso de configurar la bases de datos donde quiero dockerizar una BD PostgreSQL


# Prompt 
Me puedes mostrar las variables de entornos que deberían ir en el fichero 


# Prompt 
Ya he configurado todas las variables de entorno, por donde podría seguir 


# Prompt 
Antes de seguir con el websocket, me gustaría probar que todo funciona correctamente


# Prompt 
Proponme los diferentes puntos por los que podríamos seguir 


# Prompt 
Me podrías agregar en el @README.md  como se levanta la BD 


# Prompt 
Me puede decir un ejemplo para probar la api 


# Prompt 

Primero quiero verificar que funcione la api y luego nos centraremos en websocket. 

# Prompt 

Que version de NodeJs es la necesaria

# Prompt 

Me podrías eliminar la configuracion de websocket del proyecto para centrarme solo en la API  rest

Todas las peticiones me devuelve {"message":"Cannot GET /devices/cameras","error":"Not Found","statusCode":404}%                                           

# Prompt 
La ruta de las api tiene el formato http://localhost:3000/api/v1/validators


# Prompt 
Funciona pero no hay ningún dato en la Bases de datos


# Prompt 
Me puedes mostrar todos los endpoiint configurados 


# Prompt 
Ahora vamos a empezar con el frontend donde agregaremos toda la configuracion en la carpeta frontend de la raiz del proyecto 

prefiero usar reqact query 


# Prompt 
Puedes hacer las llamada en el proyecto de @frontend  para atacar a la api de @backend 


# Prompt 
Veo que hay un problema de cors

# Prompt 
Ya funciona, faltaría la implementacion para las validadoras


# Prompt 
En el apartado de buses no veo que un bus pueda tener un pupitre, n validadoras y n cámaras


# Prompt 
Me gustaría implementar la vista detalle de un bus, una validadora y un pupitre


# Prompt 
Quiero navegar desde el detalle de un bus a la vista detalle del pupitre, validadora o cámaras


# Prompt 
Me podrías mejorar el diseño del listado y de la vista detalle, teniendo en cuenta que en el listado no hace falta que se muestren los componentes


# Prompt 
En cada bus solo tienens que mostrar el pupitre asociado al bus, las cámaras y las validadoras asociada a dicho bus


# Prompt 
Me podrías configurar el entorno de test e2e con cypress y crear una carpeta dentro del proyecto de 


# Prompt 
Me podrías configurar el entorno de test e2e con cypress y crear una carpeta dentro del proyecto de 

ReferenceError: exports is not defined in ES module scope

Your configFile is invalid: /home/plxadmin/Escritorio/MASTER/AI4Devs-finalproject/frontend/cypress.config.ts

It threw an error when required, check the stack trace below:

# Prompt 
- Los autobuses, las validadoras y los pupitres no deben almacenar su estado en la BD. Se debe autocalcular en función de los componentes que tienen.
- Las validadoras debe devolver OK si tiene el rfid y emv OK. Si tiene un componente como KO, debe devolver warning. si tiene los dos componentes KO debe devolver KO.
- El estado de autobus debe devolver OK si todas las validadoras, pupitres y cámaras están en OK, en caso contrario debe devolver warning o KO. 
. El pupitre debe devolver OK si todos los componentes están OK.. 

# Prompt infrastructura

"Escribe un script YAML para GitHub Actions que haga lo siguiente:
 1. Se active en cada push y pull request a la rama 'main'
 2. Instale las dependencias del proyecto
 3. Ejecute las pruebas unitarias
 4. Construya la aplicación"

# Prompt infrastructura

Hazlo teniendo en cuenta @backend  y @frontend 

# Prompt infrastructura

Ten en cuenta que en @frontend  tenemos test unitarios y test e2e con cypress

# Prompt documentacion

Me puedes añadir un readme en la raiz del proyecto que explique como se despliega el frontend y el backend y la BD con docker 

# Prompt usabilidad (filtros)

Me podrías agregar filtros en pupitres, validadoras, bus para el tipo OK, KO y warning. Ten en cuenta que el filtro se tiene que hacer en el @backend 


# Prompt arquitectura 

Genera un script que haga lo siguiente:
 
  1. Clone el repositorio de GitHub.

  2. Construya la aplicación usando Docker."ara desplegar una aplicación en un servidor EC2.


# Prompt arquitectura 


Quiero que generes una pipeline usando Github Actions para desplegar en un servidor EC2.  Para ellos debes  crear un archivo yml con toda la configuracion necesaria. 


# Prompt 

Agrega filtro de estado OK, warning y KO en las vistas de autobuses, pupitres, validadoras y cámaras.
Ten en cuenta que las cámaras solo pueden estar en OK / KO. 

# Prompt
El filtrado debe procesarse en el backend, por lo tanto, lo tiene que tener la api. 