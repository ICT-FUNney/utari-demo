import React from 'react';
import { UserCtx, ProfileImage} from './User';
import './css/Header.css';

const Header: React.FC = () => {
    const userCtxValue = React.useContext(UserCtx);
    
    let list;
    if (userCtxValue.currentUser) {
        list = (
            <ul>
                <li><h3>{ userCtxValue.currentUser.name }</h3></li>
                <li><ProfileImage img={userCtxValue.currentUser!.img} onClick={() => { }} /></li>
                {/* <li><i className="fa-solid fa-user"></i></li> */}
                <li><i className="fa-solid fa-user-group"></i></li>
                <li><i className="twitter"></i></li>
            </ul>
        )
    } else {
        list = (
            <ul>
                <li><a href='/login'>ログイン</a></li>
                <li><a href='#'>ログアウト</a></li>
            </ul>
        )
    }

    return (
        <header>
            <a href='/'>
                <h3>Utari</h3>
                <h3>Demo</h3>
            </a>
            {list} 
        </header>
    )
}

export default Header;
