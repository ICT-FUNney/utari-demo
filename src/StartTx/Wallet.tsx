import React from 'react';
import { Button} from '../generals';
import { DescriptionsCtx } from '../Descriptions';
import { UserCtx, User } from '../User';
import { MaskCtx } from '../Mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import '../css/StartTx/Wallet.css';

const Wallet: React.FC = () => {
    const [to, setTo] = React.useState('');
    const [funny, setFunny] = React.useState('');
    const [displayUserList, setDisplayUserList] = React.useState(false);
    const descValue = React.useContext(DescriptionsCtx);
    const maskValue = React.useContext(MaskCtx);
    function validation() {
        if (!to) {
            descValue.callFlashMessage('宛先を指定してください。', 'alert');
            return false;
        }
        if (!funny) {
            descValue.callFlashMessage('送るfunnyの値を指定してください。', 'alert');
            return false;
        }
        if (isNaN(funny)) { //バリデーション
            descValue.callFlashMessage('funnyは半角数字で指定してください。', 'alert');
            return false;
        }
        
        return true;
    }
    
    function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (!validation()) return;

        const t = Math.floor(Math.random() * 1000000); //flash message用
        const key = 'confirm-tx' + t;
        
        function handleSend() {
            setTo('');
            setFunny('');
            if (true) {
                // descValue.callFlashMessage('トランザクションは正常に完了しました。', 'success');
                descValue.callFlashMessage('開発中です', 'warning');
                maskValue.disappear();
                descValue.removeDescription(key);
            }
        }
        
        const confirmTx = <ConfirmTx key={key} to={to} funny={funny} onSend={ handleSend } />
        descValue.addDescription(key, confirmTx);
        maskValue.setDisplayMask(true);
        maskValue.setMethodsOnDisappear((prev) => {
            return [
                ...prev,
                () => { descValue.removeDescription(key); }
            ];
        });
    }

    return (
        // <div className='wallet center'>
        <div className='wallet'>
            <h2>トランザクション 作成</h2>
            <form onSubmit={handleSubmit as React.FormEventHandler} autoComplete='off'>
                <label>
                    宛先 (ID): <br />
                    <input type='text' name='to' value={to} onChange={(e) => { setTo(e.target.value) }} />
                    <span className='friends-btn' title='送金可能なユーザ' onClick={() => { setDisplayUserList((prev) => { return !prev })}}><FontAwesomeIcon icon={faUserGroup} className='center'/></span>
                </label>
                
                <label>
                    funny: <br />
                    <input type='text' name='funny' value={funny} onChange={(e) => { setFunny(e.target.value) }} />
                </label>

                <input className='submit' type='submit' value='確認' />
            </form>
            {(displayUserList) ? <UserList setTo={setTo} onSubmit={() => { setDisplayUserList(false) }} /> : null}
        </div>
    )
}

type UserListProps = {
    setTo: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: () => void
};
const UserList: React.FC<UserListProps> = ({ setTo, onSubmit }) => {
    const userCtxValue = React.useContext(UserCtx);
    const [selectedUser, setSelectedUser] = React.useState(-1); // 何番目のuserListItemが選択されているか

    const len = Object.keys(userCtxValue.users).length;
    const [classNames, setClassNames] = React.useState([...Array(len)].map(() => { return ''; }));
    const users = Object.values(userCtxValue.users).map((user, i) => {
        return (
            <li key={i}><UserListItem i={i} className={classNames[i]} user={user} onClick={handleClickListItem} /></li>
        )
    });
    
    function handleClickListItem(i: number, userId: string) {
        setTo(userId);
        if (selectedUser < 0 || selectedUser === i) {
            let new_classNames = classNames;
            new_classNames[i] = 'selected';
            setClassNames(new_classNames);
            setSelectedUser(i);
            return;
        }
        
        
        let new_classNames = classNames;
        new_classNames[selectedUser] = '';
        new_classNames[i] = 'selected';
        setClassNames(new_classNames);
        setSelectedUser(i);
        
    }

    return (
        <div className='user-list-container'>
            <h2>送金可能なユーザ</h2>
            <ul className='user-list'>
                { users }
            </ul>
            <Button className='submit' value='決定' onClick={onSubmit} />
        </div>
    )
}

type UserListItemProps = {
    i: number,
    className: string,
    user: User,
    onClick: (id: number, userId: string) => void
};
const UserListItem: React.FC<UserListItemProps> = ({i, user, className, onClick}) => {
    function handleClick() {
        onClick(i, user.id);
    }

    return (
        <div className={`user-list-item ${className}`} onClick={handleClick}>
            <img src={user.img} alt='user image' />
            <h3>{user.name}</h3>
        </div>
    )
}


type ConfirmTxProps = {
    to: string,
    funny: string,
    onSend: () => void
};
const ConfirmTx: React.FC<ConfirmTxProps> = ({ to, funny, onSend }) => {
    
    return (
        <div className='confirm-tx center'>
            <h3>送金をクリックするとトランザクションが確定します。</h3>
            <table className='tx-table'>
                <tbody>
                    <tr>
                        <th className='th'>送金先</th>
                        <td>
                            <p>id: { to }</p>
                            <p>名前: {'panda'}</p>
                        </td>
                    </tr>
                    <tr>
                        <th className='th'>funny</th>
                        <td>
                            <p><span>{ funny }</span> funny</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Button className='submit' value='送金' onClick={onSend} />
        </div>
    )
}


export default Wallet;  
