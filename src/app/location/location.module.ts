import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LocationRoutingModule } from "./location-routing.module";
import { LocationComponent } from "./location.component";

@NgModule({
    imports: [
        LocationRoutingModule,
        NativeScriptCommonModule
    ],
    declarations: [
        LocationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class LocationModule { }