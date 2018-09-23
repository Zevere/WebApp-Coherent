import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const base = environment.apiBaseUrl;
        if (
            req.url === '/zv/GraphQL' &&
            base && base.length
        ) {
            req = req.clone({
                url: base + req.url
            });
        }

        return next.handle(req);
    }
}
