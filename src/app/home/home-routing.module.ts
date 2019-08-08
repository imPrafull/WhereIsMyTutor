import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { AuthGuard } from "../services/auth-guard.service";

const routes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard], data: { expectedRole: 'Teacher' } }   //Only allow logged in users here
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard]
})
export class HomeRoutingModule { }
