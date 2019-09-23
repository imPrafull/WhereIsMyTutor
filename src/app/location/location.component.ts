import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { LocationService } from "../services/location.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    selector: "wmt-location",
    templateUrl: "./location.component.html",
    styleUrls: ["./location.component.css"],
    providers: [LocationService]
})

export class LocationComponent implements OnInit {

    locations: Array<object> = [];
    processing: boolean = false;   //activity indicator

    constructor(private router: RouterExtensions, private locationService: LocationService) {
    }

    ngOnInit(): void {
        this.getLocations();
    }

    getLocations(): void {
        //this.processing = true;
        this.locationService.getLocations()
            .subscribe(response => {
                this.locations = response;
                console.log(response)
                console.log(this.locations);
                //this.processing = false;
            }, error => console.log("getLocations error: " + error))
    }

    onItemTap(args) {
        console.log("You tapped: " + this.locations[args.index]);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}