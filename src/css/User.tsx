import React from 'react';

module IdGanerator {
    let cnt = 0;
    export function generateId() {
        return cnt++;
    }
}

class User {
    private _id: number;
    private _name: string;
    private _img: string;
    
    constructor(name: string, img: string) {
        this._id = IdGanerator.generateId();
        this._name = name;
        this._img = img;
    }

    get id(): number { return this._id; }
    get name(): string { return this._name; }
    get img(): string { return this._img; } 
}

interface UserContextInterface {
    currentUser: User | null, //ログイン中のユーザ
    setCurrentUser: (user: User) => boolean,
    users: { [id: number]: User }, //ノードが立ってる全ユーザ. ユーザ数が増えると重くなるので要改善(友達のみ表示とか)
    addUser: (user: User) => boolean
}

function useUser() {
    const [currentUser, _setCurrentUser] = React.useState(null as (User | null));
    function setCurrentUser(user: User) {
        if (false) { // 不正なユーザー(未登録)の場合はfalseを返す
            return false;
        } 
        _setCurrentUser(user);
        return true;
    }
    
    const [users, _addUser] = React.useState({} as { [id: number]: User });
    function addUser(user: User) {
        if (false) { // 不正なユーザー(登録済みなど)の場合はfalseを返す
            return false;
        } 
        _addUser((prev) => {
            return {
                ...prev,
                [user.id]: user
            }
        });
        return true;
    }

    return {
        currentUser,
        setCurrentUser,
        users,
        addUser
    }
}

const UserCtx = React.createContext({} as UserContextInterface);
