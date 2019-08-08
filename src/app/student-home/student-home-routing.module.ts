import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { StudentHomeComponent } from "./student-home.component";
import { AuthGuard } from "../services/auth-guard.service";

const routes: Routes = [
    { path: "", component: StudentHomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'Student' } }   //Only allow students here
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard],
})
export class StudentHomeRoutingModule { }
