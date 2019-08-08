import { Component, OnInit } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
import { LocationService } from "./services/location.service";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    moduleId: module.id,
    selector: "wmt-app",
    templateUrl: "app.component.html",
    providers: [LocationService,]
})
export class AppComponent implements OnInit {

    public role: string;
    public token: string;

    public setRole(role: string) {
        this.role = role;
    }

    public setToken(token: string){
        this.token = token;
    }

    constructor(public locationService: LocationService) {

    }

    ngOnInit(): void {
        let self = this.locationService;
        let tempToken: string;
        firebase.init({
            persist: false,
            onAuthStateChanged: (data: any) => {
                console.log(JSON.stringify(data))
                if (data.loggedIn) {
                    console.log("Logged in with role "+appSettings.getString("Role"));
                }
                else {
                    appSettings.setString("Token", "");
                }
            }
        }).then(
            instance => {
                console.log("Firebase Initialized!!!");
            },
            error => {
                console.log("Firebase init failed! Error: ${error}");
            }
        );
    }
}
