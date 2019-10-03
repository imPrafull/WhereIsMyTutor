import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { action } from "tns-core-modules/ui/dialogs";
import { LocationService } from "../services/location.service";
import { User } from "../models/user";

@Component({
    moduleId: module.id,
    selector: "wmt-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.css"]
})

export class UserComponent implements OnInit {

    public email: string;
    public role: string = "Student";
    public users: User[];

    constructor(private locationService: LocationService) {
    }

    ngOnInit(): void {
    }

    onRoleTap() {
        let options = {
            title: "Role of User",
            message: "Choose the role of the user",
            cancelButtonText: "Cancel",
            actions: ["Student", "Teacher"]
        };

        action(options).then((result) => {
            this.role = (result == 'Cancel') ? this.role : result;
        });
    }

    addUser(email: string){
        this.email = email;
        //this.users.push({email: this.email, role: this.role});
        let request = this.locationService.addUser(email, this.role);
        request.subscribe((res) => console.log("User added successfully! "+ res))
        
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}