import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
    // private userSubject: BehaviorSubject<User>;
    public user!: Observable<User>;
    public apiUrl = 'http://localhost:3000'

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    login(userEmail: string, password: string) {
        console.log(userEmail, password)
        return this.http.post<User>(`${this.apiUrl}/login`, { email: userEmail, password: password })
    }

    register(firstLastName: string, userEmail: string, password: string) {
        console.log(firstLastName, userEmail, password)
        return this.http.post<User>(`${this.apiUrl}/register`, { name: firstLastName, email: userEmail, password: password })
    }

    profileUpdate(id: string, newName: string) {
        console.log(id, newName);
        return this.http.put<User>(`${this.apiUrl}/user/name`, { id: id, newName: newName });
    }

    accountDelete(id: string) {
        console.log(id);
        return this.http.delete<User>(`${this.apiUrl}/user`, { body: { id: id } });
    }

    addActivity(name: string, date: Date, userId: string) {
        console.log(name, date, userId)
        return this.http.post<User>(`${this.apiUrl}/activity`, { name: name, date: date, userId: userId });
    }

    getActivities() {
        return this.http.get<User>(`${this.apiUrl}/activities`);
    }

    addChat(name: string, date: Date, userId: string) {
        console.log(name, date, userId)
        return this.http.post<User>(`${this.apiUrl}/chat`, { name: name, date: date, userId: userId });
    }

    getChats() {
        return this.http.get<User>(`${this.apiUrl}/chats`);
    }

    addTeam(name: string, date: Date, userId: string) {
        console.log(name, date, userId)
        return this.http.post<User>(`${this.apiUrl}/team`, { name: name, date: date, userId: userId });
    }

    getTeams() {
        return this.http.get<User>(`${this.apiUrl}/teams`);
    }

    addMessage( sideBar1: string, sideBar2: string, message: string, date: Date, userId: string) {
        console.log(sideBar1, sideBar2, message, date, userId);
        return this.http.post<User>(`${this.apiUrl}/message`, { sideBar1: sideBar1, sideBar2: sideBar2, message: message, date: date, userId: userId });
    }

    getMessages(sideBar1: string, sideBar2: string, userId: string) {
        console.log( sideBar1, sideBar2, userId);
        return this.http.post<User>(`${this.apiUrl}/messages`, {  sideBar1: sideBar1, sideBar2: sideBar2, userId: userId })
    }

    

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     // this.userSubject.next(null);
    //     this.router.navigate(['/account/login']);
    // }

    // register(user: User) {
    //     return this.http.post(`${this.apiUrl}/users/register`, user);
    // }

    // getAll() {
    //     return this.http.get<User[]>(`${this.apiUrl}/users`);
    // }

    // getById(id: string) {
    //     return this.http.get<User>(`${this.apiUrl}/users/${id}`);
    // }
}

export interface User {
    id?: string;
}