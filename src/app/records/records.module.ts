import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RecordsRoutingModule } from "./records-routing.module";
import { RecordsComponent } from "./records.component";

@NgModule({
    imports: [
        RecordsRoutingModule,
        NativeScriptCommonModule
    ],
    declarations: [
        RecordsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class RecordsModule { }