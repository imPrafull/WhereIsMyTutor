import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Location } from "../models/location";
import * as appSettings from "tns-core-modules/application-settings";
import { Record } from "../models/record";

let httpOptions = {
    headers: new HttpHeaders({
        'Authorization': appSettings.getString("Token")
    })
}

@Injectable()
export class LocationService{

    private apiURL: string = "http://prafull158.pythonanywhere.com/api";

    constructor(private http: HttpClient){

    }

    getRole() {
        return this.http.get(this.apiURL + '/roles', { headers: new HttpHeaders({'Authorization': appSettings.getString("Token")})});
    }

    addLocation(teacherName: string, className: string, lectures: number, startTime: string, endTime: string, startTimeDate: string){   //insert into backend
        return this.http.post(this.apiURL + '/locations', { teacher_name: teacherName, class_name: className, lectures: lectures, arrival_time: startTime, end_time: endTime, date: startTimeDate }, httpOptions);
    }

    getLocations(){   //Get locations from backend
        return this.http.get<Location[]>(this.apiURL + '/locations_today', httpOptions);
    }

    getRecords(){   //Get locations from backend
        return this.http.get<Record[]>(this.apiURL + '/locations', httpOptions);
    }
}