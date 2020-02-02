import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   let roleArray = next.data
   let  s = false
   let jwtData = localStorage.getItem('token').split('.')[1]
let decodedJwtJsonData = window.atob(jwtData)
let decodedJwtData = JSON.parse(decodedJwtJsonData)
console.log('roleArray',roleArray.expectedRole)
decodedJwtData.app_metadata.authorization.roles.forEach(element => {
  if(element == roleArray.expectedRole){
    console.log("Roles Matched");
  s = true
    
  }
 
});
if(s){
  return true
}
   
  }
  
}
