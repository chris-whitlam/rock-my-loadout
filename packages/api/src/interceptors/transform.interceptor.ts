import { ExecutionContext, NestInterceptor } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response: any) => {
        if (response && response.hasOwnProperty('payload')) {
          return response;
        }

        return { payload: response };
      })
    );
  }
}
