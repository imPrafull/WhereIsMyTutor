import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { LocationService } from "./services/location.service";
import { FirebaseService } from "./services/firebase.service";
import { AppService } from "./app.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        HttpClientModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        BarcodeScanner, 
        LocationService, 
        FirebaseService,
        AppService
    ]
})
export class AppModule { }
