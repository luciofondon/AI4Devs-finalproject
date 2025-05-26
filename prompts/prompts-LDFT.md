

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