import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';

// This interceptor is responsible for tracking any error of the application and send it to Sentry.io
// All you need is to add (@UseInterceptors(SentryInterceptor)) before every resolver or controller
@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        return throwError(() => error);
      }),
    );
  }
}
