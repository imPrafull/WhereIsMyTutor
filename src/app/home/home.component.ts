import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { action } from "tns-core-modules/ui/dialogs";
import { LocationService } from "../services/location.service";
import { FirebaseService } from "../services/firebase.service";
import { getCurrentUser, User as firebaseUser } from "nativescript-plugin-firebase";
import * as moment from "moment";
import * as Toast from "nativescript-toast";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [LocationService, FirebaseService]
})
export class HomeComponent implements OnInit {

    token = appSettings.getString("Token");
    user: firebaseUser;
    hc_teacherName: string;
    scanTime: string;
    message: string;
    processing: boolean = false;   //activity indicator

    constructor(private routerExtensions: RouterExtensions,
        private barcodeScanner: BarcodeScanner,
        public locationService: LocationService,
        private firebaseService: FirebaseService
    ) {
    }

    ngOnInit(): void {
        getCurrentUser()
            .then(result => {
                this.hc_teacherName = result.displayName;
            });
    }

    calcEndTime(startTime: any, lectures: number): string {  //Approximate endtime of lectures
        let endTime = startTime;
        let formattedEndTime;
        switch (lectures) {
            case 0:
                formattedEndTime = "No lecture";

            case 1:
                endTime.add(48, "m");
                break;

            case 2:
                endTime.add(48 * 2, "m");
                break;

            case 3:
                endTime.add(48 * 3, "m");
                break;

            case 4:
                endTime.add(48 * 4, "m");
                break;

            case 5:
                endTime.add(48 * 5, "m");
                break;
        }

        let hours = endTime.hours();
        switch (hours) {
            case 8:
                endTime.minutes(46);
                break;

            case 9:
                endTime.minutes(34);
                break;

            case 10:
                endTime.minutes(42);
                break;

            case 11:
                endTime.minutes(30);
                break;

            case 12:
                endTime.minutes(18);
                break;

            case 1:
                endTime.minutes(6);
                break;

            default:
                break;
        }

        formattedEndTime = endTime.format("h:m a");
        return formattedEndTime;
    }

    public onScan(): void {   //on tapping scan
        let self = this;
        let teacherName: string = this.hc_teacherName;
        let formattedStartTime: string;
        let formattedEndTime: string;
        let formattedStartTimeDate: string;
        let startTime;
        let scan = () => {
            this.barcodeScanner.scan({
                formats: "QR_CODE",
                beepOnScan: true,
                reportDuplicates: true,
                preferFrontCamera: false
            })
                .then(result => {   //scan result promise resolved
                    startTime = moment();
                    startTime = startTime.clone();
                    formattedStartTime = moment().format("h:mm a");
                    formattedStartTimeDate = moment().format("YYYY-MM-DD");
                    console.log(result.text);
                    let className = result.text;
                    setTimeout(function () {
                        let options = {
                            title: "No. of Lectures",
                            message: "Choose the number of lectures.",
                            cancelButtonText: "Cancel",
                            actions: ["0", "1", "2", "3", "4", "5"]
                        };
                        action(options).then((result) => {   //prompt for no. of lectures
                            console.log(result);
                            formattedEndTime = HomeComponent.prototype.calcEndTime(startTime, Number(result));
                            let request = self.locationService.addLocation(teacherName, className, Number(result), formattedStartTime, formattedEndTime, formattedStartTimeDate);
                            request.subscribe((res) => { console.log("Post successful!", res); },
                                () => Toast.makeText("Location updated sucessfully!","long").show()
                            )
                        }
                        );
                    }, 500);
                })
                .catch(error => console.log("Scan error: " + error));

        };

        this.barcodeScanner.hasCameraPermission()
            .then(granted => granted ? scan() : console.log("Permission denied"))
            .catch(() => {
                this.barcodeScanner.requestCameraPermission()
                    .then(() => scan());
            });
    }

    onLocationTap(): void {
        this.routerExtensions.navigate(["location"]);
    }

    createToast() {
        Toast.makeText("Location updated sucessfully!", "long").show();
        console.log("Toast");
    }

    onAdminTap(){
        console.log("admin tapped")
    }

    logout(): void {
        this.processing = true;
        this.firebaseService.logout();
        this.processing = false;
        this.routerExtensions.navigate(["login"], { clearHistory: true });
    }
}
