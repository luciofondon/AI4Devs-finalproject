

Revisa el fichero @readme.md  y que este todo correcto 


Quiero empezar a desarrollar el backend, me gustaría que me propusiese los pasos por los que podríamos comenzar 


Todo lo relacionado con el backend lo haremos en una carpeta backend 


Me gustaría empezar con el paso de Configurar la bases de datos donde quiero dockerizar una BD PostgreSQL

Me puedes mostrar las variables de entornos que deberían ir en el fichero 


Ya he configurado todas las variables de entorno, por donde podría seguir 


Antes de seguir con el websocket, me gustaría probar que todo funciona correcgtamente

Proponme los diferentes puntos por los que podríamos seguir 


Me podrías agregar en el @README.md  como se levanta la BD 

Me puede decir un ejemplo para probar la api 

Primero quiero verificar que funcione la api y luego nos centraremos en websocket,. 



import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
})
export class AppModule {} para TypeOrmModule.forRootAsync() 


Que version de NodeJs es la necesaria

Ahora vamos a proceder a la configuracion del websocket


Me podrías eliminar la configuracion de websocket del proyecto para centrarme solo en la API  rest


Todas las peticiones me devuelve {"message":"Cannot GET /devices/cameras","error":"Not Found","statusCode":404}%                                           


La ruta de las api tiene el formato http://localhost:3000/api/v1/validators

Funciona pero no hay ningún dato en la Bases de datos


Me puedes mostrar todos los endpoiint configurados 


Ahora vamos a empezar con el frontend donde agregaremos toda la configuracion en la carpeta frontend de la raiz del proyecto 


prefiero usar reqact query 

Puedes hacer las llamada en el proyecto de @frontend  para atacar a la api de @backend 


Veo que hay un problema de cors


Ya funciona, faltaría la implementacion para las validadoras


En el apartado de buses no veo que un bus pueda tener un pupitre, n validadoras y n cámaras

Me gustaría implementar la vista detalle de un bus, una validadora y un pupitre

Quiero navegar desde el detalle de un bus a la vista detalle del pupitre, validadora o cámaras


Me podrías mejorar el diseño del listado y de la vista detalle, teniendo en cuenta que en el listado no hace falta que se muestren los componentes

En cada bus solo tienens que mostrar el pupitre asociado al bus, las cámaras y las validadoras asociada a dicho bus