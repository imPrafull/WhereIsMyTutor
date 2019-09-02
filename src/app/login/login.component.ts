import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../services/firebase.service";
import { LocationService } from "../services/location.service";
import { getAuthToken } from "nativescript-plugin-firebase";
import * as appSettings from "tns-core-modules/application-settings"
import { Page } from "ui/page";
import { alert } from "tns-core-modules/ui/dialogs";
import { AppService } from "../app.service";
import { setString } from "nativescript-plugin-firebase/crashlytics/crashlytics";

@Component({
    selector: "wmt-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["login.component.css"],
    providers: [FirebaseService, LocationService,]
})
export class LoginComponent implements OnInit {

    processing: boolean = false;   //activity indicator
    role: string;

    constructor(
        page: Page,
        private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private locationService: LocationService,
        private appService: AppService
    ) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void {
    }

    loginWithGoogle(): void {
        let self = this.locationService
        this.processing = true;
        this.firebaseService.login()
            .then(result => {
                console.log("Login success!");
                getAuthToken({
                    forceRefresh: false
                }).then(
                    (token) => {
                        appSettings.setString("Token", token.token);
                        console.log("Auth token retrieved!");
                        self.getRole()
                            .subscribe(res => {
                                let role: string = res['role']
                                appSettings.setString("Role", role);
                                console.log(appSettings.getString("Role"));
                                this.appService.changeRole(role)
                            });
                    },
                    function (errorMessage) {
                        alert({
                            title: "Auth Token error",
                            message: errorMessage,
                            okButtonText: "Ok"
                        }).then(() => {
                            console.log("The user closed the alert.");
                        });
                    }
                );
                setTimeout(() => {
                    if (appSettings.getString("Role") == "Student" || appSettings.getString("Role") == "Teacher"  ) {
                        this.routerExtensions.navigate(["home"], { clearHistory: true });
                    }
                    else {
                        alert({
                            title: "Unauthorized access",
                            message: "Account is not authorized",
                            okButtonText: "Ok"
                        }).then(() => {
                            console.log("The user closed the alert.");
                        });
                    }
                }, 2000);
                this.processing = false;
            })
            .catch(err => {
                alert({
                    title: "Login error",
                    message: "Check your internet connection",
                    okButtonText: "Ok"
                }).then(() => {
                    console.log("The user closed the alert.");
                });
                this.processing = false;
            })
    }
}