import React from 'react';
import './css/User.css';

interface UserDataInterface {
    id: string,
    name: string,
    img: string
}

export class User {
    private _id: string;
    private _name: string;
    private _img: string;
    
    constructor(params: UserDataInterface) {
    // constructor(id: string, name: string, img: string) {
        this._id = params.id;
        this._name = params.name;
        this._img = params.img;
    }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get img(): string { return this._img; } 
}

export interface UserContextInterface {
    currentUser: User | null, //ログイン中のユーザ
    login: (id: string, password: string) => boolean,
    users: { [id: string]: User }, //ノードが立ってる全ユーザ. ユーザ数が増えると重くなるので要改善(友達のみ表示とか)
    addUser: (user: User) => boolean,
    checkLogin: () => void
}

// ユーザの情報をサーバからfetchする
function fetchUserData(id: string, password: string) {
    if (false) return null; // パスワードの不一致などでfetchに失敗した場合
    return {
        id: id,
        name: 'Panda X',
        img: `${process.env.PUBLIC_URL}/img/panda_x.png`
    }
}

export function useUser() {
    const [currentUser, _setCurrentUser] = React.useState(null as (User | null));
    function login(id: string, password: string) {
        const userData = fetchUserData(id, password);
        if (!userData) return false;
        const user = new User(userData); //もっと良い書き方あるはず
        _setCurrentUser(user);
        return true;
    }
    
    // 開発用. userを何個か作っておく
    const _users = {
        'red123': new User({ id: 'red123', name: 'Panda Red', img: `${process.env.PUBLIC_URL}/img/panda_red.png` }),
        'blue456': new User({ id: 'blue456', name: 'Panda Blue', img: `${process.env.PUBLIC_URL}/img/panda_blue.png` }),
        'yellow789': new User({ id: 'yellow789', name: 'Panda Yellow', img: `${process.env.PUBLIC_URL}/img/panda_yellow.png` }),
    }
    const [users, _addUser] = React.useState(_users);
    //
    // const [users, _addUser] = React.useState({} as { [id: number]: User });
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

    // ログインしてない場合、ログイン画面へ
    
    function checkLogin() {
        // if (!currentUser) {
        //     window.location.href = '/login';
        // }
    }

    return {
        currentUser,
        login,
        users,
        addUser,
        checkLogin
    }
}

type ProfileImgProps = {
    img: string,
    onClick: () => void
};
export const ProfileImage: React.FC<ProfileImgProps> = ({ img, onClick }) => {
    return (
        <div className='profile-img' onClick={onClick}>
            <img src={img} alt='profile image' />
        </div>
    )
}



export const UserCtx = React.createContext({} as UserContextInterface);
