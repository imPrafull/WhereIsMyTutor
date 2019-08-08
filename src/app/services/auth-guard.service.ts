import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRole = route.data.expectedRole;

        if(appSettings.getString("Token") != "" || appSettings.getString("Role") == expectedRole){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
