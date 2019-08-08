import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { LocationService } from "./location.service";
import * as appSettings from "tns-core-modules/application-settings";
import {
    login as firebaseLogin,
    logout as firebaseLogout,
    User as firebaseUser,
    LoginType
} from "nativescript-plugin-firebase";

@Injectable()
export class FirebaseService {
    user: firebaseUser;
    res_role: string

    constructor(private routerExtensions: RouterExtensions, public locationService: LocationService) {

    }

    login() {
        let self = this.locationService
        return firebaseLogin({ type: LoginType.GOOGLE })   //Google Login
    }

    logout(): void {   //Logout
        firebaseLogout()
            .then(() => {
                this.user = null;
                appSettings.setString("Token", "");
                appSettings.setString("Role", "");
                console.log("Logout Success");
            })
            .catch(err => {
                console.log("Logout Fail: " + err);
            })
    }

}
