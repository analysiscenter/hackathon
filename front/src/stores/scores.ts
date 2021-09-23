import { makeAutoObservable, toJS } from "mobx"
import { string } from "prop-types";
import Cookies from "universal-cookie";

import mockData from "./mock-data";

class User {
    name = undefined as string;
    isLogging = false;
    loggedIn = false;
    cancelLogging = false;
    team = "Frgthy sd";
}

class Team {
    id: string;
    name : string;
    score: number;
    numOfSubmits: number;
}

class Task {
    name : string;
    link : string;
    icon : string;
    teams: Team[];
}


export class ScoreStore {

    cookies = new Cookies();

    user = new User();

    tasks : Record<string, Task>;

    constructor() {
        makeAutoObservable(this);
        makeAutoObservable(this.user);
        this.tasks = mockData;
        makeAutoObservable(this.tasks)
    }

    isAuthenticated() : boolean {
        return this.user.loggedIn;
    }

    setUser(fields: Partial<User>) : void {
        Object.assign(this.user, fields);
    }

    login(name: string, password: string) : void {
        this.setUser( { isLogging: true });
        setTimeout(() => {
            if (this.user.cancelLogging){
                this.setUser({ isLogging: false, loggedIn: false, cancelLogging: false});
            }
            else {
                this.cookies.set("login", name, { path: "/ "});
                const date = new Date();
                date.setDate(date.getDate() + 30)
                this.cookies.set("password", password, { path: "/ ", expires: date});

                this.setUser({ name: name, isLogging: false, loggedIn: true, cancelLogging: false});
            }
        }, 1000);
    }

    cancelLogin() : void {
        this.setUser({ name: undefined, isLogging: false, loggedIn: false, cancelLogging: true});
    }

    logout() : void {
        this.setUser({ name: undefined, isLogging: false, loggedIn: false, cancelLogging: false});
        setTimeout(() => {
            this.cookies.remove("login", { path: "/ "});
            this.cookies.remove("password", { path: "/ " });
        }, 2000);
    }

    get_task(id: string) : Task {
        return this.tasks[id];
    }
}
