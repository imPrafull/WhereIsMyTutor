import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { LocationService } from "../services/location.service";

@NgModule({
    imports: [
        UserRoutingModule,
        NativeScriptCommonModule
    ],
    declarations: [
        UserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        LocationService
    ]
})

export class UserModule { }