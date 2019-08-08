import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { LocationService } from "../services/location.service";
import { FirebaseService } from "../services/firebase.service";
import { User as firebaseUser } from "nativescript-plugin-firebase";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./student-home.component.html",
    styleUrls: ["../home/home.component.css"],
    providers: [LocationService, FirebaseService]
})
export class StudentHomeComponent implements OnInit {

    user: firebaseUser;
    processing: boolean = false;   //activity indicator

    constructor(private routerExtensions: RouterExtensions,
        public locationService: LocationService,
        private firebaseService: FirebaseService
    ) {
    }

    ngOnInit(): void {
    }

    onLocationTap(): void {
        this.routerExtensions.navigate(["location"]);
    }

    logout(): void {
        this.processing = true;
        this.firebaseService.logout();
        this.processing = false;
        this.routerExtensions.navigate(["login"], { clearHistory: true });
    }
}
