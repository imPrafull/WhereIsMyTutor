import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "about", loadChildren: "~/app/about/about.module#AboutModule" },
    { path: "location", loadChildren: "~/app/location/location.module#LocationModule" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "records", loadChildren: "~/app/records/records.module#RecordsModule" },
    { path: "user", loadChildren: "~/app/user/user.module#UserModule" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
