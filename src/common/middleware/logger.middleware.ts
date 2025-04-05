/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next();
  }
}
// este middleware se encarga de logear las peticiones que llegan al servidor, mostrando la fecha y hora, el método HTTP y la URL de la petición. Se utiliza el decorador @Injectable() para indicar que es un servicio que puede ser inyectado en otros componentes de NestJS. La función use() es la que se ejecuta cada vez que se recibe una petición, y dentro de ella se utiliza console.log() para mostrar la información deseada. Finalmente, se llama a next() para continuar con el siguiente middleware o controlador.
// Este middleware se puede utilizar en la configuración de la aplicación, por ejemplo, en el archivo main.ts, donde se puede registrar el middleware utilizando app.use(LoggerMiddleware) para que se aplique a todas las rutas de la aplicación. También se puede aplicar a rutas específicas utilizando el decorador @UseMiddleware() en los controladores o rutas individuales.