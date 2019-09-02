import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AppService {
    private roleSource = new BehaviorSubject('Student');
    currentRole = this.roleSource.asObservable();

    constructor() { }

    changeRole(role: string) {
        this.roleSource.next(role)
    }

}