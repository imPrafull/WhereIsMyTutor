import { AppService } from "./app.service";
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    AfterViewInit,
    ViewChild
} from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
import { LocationService } from "./services/location.service";
import * as appSettings from "tns-core-modules/application-settings";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";
import { FirebaseService } from "./services/firebase.service";
import { filter } from "rxjs/operators";
import { NavigationEnd, Router } from "@angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";

@Component({
    moduleId: module.id,
    selector: "wmt-app",
    templateUrl: "app.component.html",
    providers: [
        LocationService,
        FirebaseService,
        AppService
    ]
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent: RadSideDrawerComponent;

    private _drawer: RadSideDrawer;
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    public role: string;
    public token: string;

    public setToken(token: string) {
        this.token = token;
    }

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private router: Router,
        public locationService: LocationService,
        private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private _drawerService: AppService
    ) {

    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();
        let self = this.locationService;
        let tempToken: string;
        firebase.init({
            persist: false,
            onAuthStateChanged: (data: any) => {
                console.log(JSON.stringify(data))
                if (data.loggedIn) {
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

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    ngAfterViewInit() {
        this._drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

        this._drawerService.currentRole.subscribe(Role => this.role = Role);
        console.log("The role of the user is " + this.role)
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onLogoutTap(): void {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["login"], {
            transition: {
                name: "fade"
            },
            clearHistory: true
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
