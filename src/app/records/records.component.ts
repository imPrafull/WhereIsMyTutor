import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { LocationService } from "../services/location.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    selector: "wmt-records",
    templateUrl: "./records.component.html",
    styleUrls: ["./records.component.css"],
    providers: [LocationService]
})

export class RecordsComponent implements OnInit {

    records: Array<object> = [];
    processing: boolean = false;   //activity indicator

    constructor(private router: RouterExtensions, private locationService: LocationService) {
    }

    ngOnInit(): void {
        this.getRecords();
    }

    getRecords(): void {
        //this.processing = true;
        this.locationService.getRecords()
            .subscribe(response => {
                this.records = response;
                console.log(response)
                console.log(this.records);
                //this.processing = false;
            }, error => console.log("getRecords error: " + error))
    }

    onItemTap(args) {
        console.log("You tapped: " + this.records[args.index]);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}