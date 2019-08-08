import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { StudentHomeRoutingModule } from "./student-home-routing.module";
import { StudentHomeComponent } from "./student-home.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        StudentHomeRoutingModule
    ],
    declarations: [
        StudentHomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StudentHomeModule { }
