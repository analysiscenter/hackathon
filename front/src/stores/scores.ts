import { makeAutoObservable, toJS } from "mobx"
import Cookies from "universal-cookie";


import mockData from "./mock-data";


class User {
    name = undefined as string;
    isWaiting = false;
    loggedIn = false;
    cancelLogging = false;
    team_id = "T1";
    teamName = "Team 1"
}

class TeamScore {
    id: string;
    name: string;
    score: number;
    numOfSubmits: number;
}

class Task {
    name : string;
    link : string;
    icon : string;
    teams: TeamScore[];
}

class Submit {
    userName: string;
    task_id: string;
    score: number;
    time: Date;
}

type SubmitLog = Submit[];


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

    register(fields: Partial<User>) : void {
        const a = fields;
        this.setUser({ isWaiting: true});
        // send to the server
        setTimeout(() => {
            this.setUser({ isWaiting: false});
        }, 2000);
    }

    setUser(fields: Partial<User>) : void {
        Object.assign(this.user, fields);
    }

    login(name: string, password: string) : void {
        this.setUser( { isWaiting: true });
        setTimeout(() => {
            if (this.user.cancelLogging){
                this.setUser({ isWaiting: false, loggedIn: false, cancelLogging: false});
            }
            else {
                this.cookies.set("login", name, { path: "/ "});
                const date = new Date();
                date.setDate(date.getDate() + 30)
                this.cookies.set("password", password, { path: "/ ", expires: date});

                this.setUser({ name: name, isWaiting: false, loggedIn: true, cancelLogging: false});
            }
        }, 1000);
    }

    cancelLogin() : void {
        this.setUser({ name: undefined, isWaiting: false, loggedIn: false, cancelLogging: true});
    }

    logout() : void {
        this.setUser({ name: undefined, isWaiting: false, loggedIn: false, cancelLogging: false});
        setTimeout(() => {
            this.cookies.remove("login", { path: "/ "});
            this.cookies.remove("password", { path: "/ " });
        }, 2000);
    }

    get_task(id: string) : Task {
        return this.tasks[id];
    }

    submit(file: File) : void {
        this.setUser({ isWaiting: true});
        // send to the server
        setTimeout(() => {
            this.setUser({ isWaiting: false});
        }, 5000);
    }
}
