import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("por aqquí pase");
  let a  = req;
  a = req.clone({
    setHeaders:{
      Authorization : `Bearer ${localStorage.getItem("token")}`
    }
  })

  return next(a).pipe( catchError( errores));
};


function errores (error: HttpErrorResponse) {

  console.log(error.status);
  return throwError(() => new Error('Something bad happened; please try again later.'));
}