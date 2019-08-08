import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Location } from "../models/location";
import * as appSettings from "tns-core-modules/application-settings";

let httpOptions = {
    headers: new HttpHeaders({
        'Authorization': appSettings.getString("Token")
    })
}

@Injectable()
export class LocationService{

    private locationsURL: string = "http://prafull158.pythonanywhere.com/api/locations";

    constructor(private http: HttpClient){

    }

    getRole() {
        return this.http.get("http://prafull158.pythonanywhere.com/api/roles", { headers: new HttpHeaders({'Authorization': appSettings.getString("Token")})});
    }

    //getRole(){
    //    return new Promise((resolve =>{
    //    this.http.get("http://prafull158.pythonanywhere.com/api/roles", httpOptions);
    //    });
    //}

    addLocation(teacherName: string, className: string, lectures: number, startTime: string, endTime: string, startTimeDate: string){   //insert into backend
        return this.http.post(this.locationsURL, { teacher_name: teacherName, class_name: className, lectures: lectures, arrival_time: startTime, end_time: endTime, date: startTimeDate }, httpOptions);
    }

    getLocations(){   //Get locations from backend
        return this.http.get<Location[]>(this.locationsURL, httpOptions);
    }
}