import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "student-home", loadChildren: "~/app/student-home/student-home.module#StudentHomeModule" },
    { path: "about", loadChildren: "~/app/about/about.module#AboutModule" },
    { path: "location", loadChildren: "~/app/location/location.module#LocationModule" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
