import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, take } from "rxjs";
import { UserData } from "./models";

@Injectable()
export class HttpBinService {

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    // METHODS
    // Takes in UserData object and Promise to return
    doPost(data:UserData):Promise<any> {
        return firstValueFrom(this.http.post<any>('http://httpbin.org/post', data)
                    // Posting as UserData will return JsonObject under data 
                    .pipe(take(1), map(v => v.data)))
    }

    doPostAsForm(data:UserData):Promise<any> {
        const headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        let qs = new HttpParams()
                        .set("userId", data.userId? data.userId:'')
                        .set("name", data.name)
                        .set("email", data.email)
        return firstValueFrom(this.http.post<any>('http://httpbin.org/post', qs.toString(), { headers })
                    // Posting as form will return JsonObject under form
                    .pipe(take(1), map(v => v.form)))
    }

    doGet(data:UserData):Promise<UserData> {
        let qs = new HttpParams()
                        .set("userId", data.userId? data.userId:'')
                        .set("name", data.name)
                        .set("email", data.email)
        // Send get request http://httpbin.org/get?userId=123&name=txl&email=txl@gmail.com
        // Map entire result to return only args JsonObject {"email":txl@gmail.com,"name"="txl,userId":"123"}
        return firstValueFrom<UserData>(this.http.get<any>('http://httpbin.org/get', { params:qs })
                    .pipe(take(1), map(v => v.args)))
    }
}