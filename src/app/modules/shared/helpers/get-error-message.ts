import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extracts the error message from an HTTP response error
 */
export function getErrorMessage(e: any): string {
    if (!e) {
        return 'ERROR';
    }
    if (e instanceof HttpErrorResponse) {
        return e.error.error || e.statusText;
    } else {
        return e.toString();
    }
}
