import React from 'react';
import { Button} from '../generals';
import { DescriptionsCtx } from '../Descriptions';
import { UserCtx, User } from '../User';
import { MaskCtx } from '../Mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import '../css/StartTx/Wallet.css';

/**
 * ユーザがTxを入力する部分。
 * 「Wallet」という名前が適切かは不明。
 * @returns {HTMLElement}
 */
const Wallet: React.FC = () => {
    const [to, setTo] = React.useState('');
    const [funny, setFunny] = React.useState('');
    const [displayUserList, setDisplayUserList] = React.useState(false);
    const descValue = React.useContext(DescriptionsCtx);
    const maskValue = React.useContext(MaskCtx);
    function validation() {
        if (!to) {
            descValue.callFlashMessage('送金先を指定してください。', 'alert');
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
        if (Number(funny) <= 0) {
            descValue.callFlashMessage('funnyは0より大きい値で指定してください。', 'alert');
            return false;
        }

        return true;
    }
    
    function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (!validation()) return;

        setDisplayUserList(false);

        const key = 'confirm-tx';
        
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

        function handleCancel() {
            descValue.removeDescription(key);
            maskValue.disappear();
        }
        
        const confirmTx = <ConfirmTx key={key} to={to} funny={funny} onSend={handleSend} onCancel={handleCancel} />
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
        <div className='wallet-container'>
            <div className='wallet'>
                <h3>トランザクション 作成</h3>
                <form onSubmit={handleSubmit as React.FormEventHandler} autoComplete='off'>
                    <label>
                        送金先 (ID): <br />
                        <input type='text' name='to' value={to} onChange={(e) => { setTo(e.target.value) }} />
                        <span className='friends-btn' title='送金可能なユーザ' onClick={() => { setDisplayUserList((prev) => { return !prev })}}><FontAwesomeIcon icon={faUserGroup} className='center'/></span>
                    </label>
                    
                    <label>
                        funny: <br />
                        <input type='text' name='funny' value={funny} onChange={(e) => { setFunny(e.target.value) }} />
                    </label>

                    <input className='btn submit' type='submit' value='確認' />
                </form>
                {(displayUserList) ? <UserList setTo={setTo} onSubmit={() => { setDisplayUserList(false) }} /> : null}
            </div>
        </div>

    )
}

type UserListProps = {
    setTo: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: () => void
};
/**
 * 送信可能なユーザ一覧を表示
 * @param setTo 親コンポーネントのtoを更新する関数
 * @param onSubmit 送信ボタンが押されたときの処理
 * @returns {HTMLElement}
 * 
 */
const UserList: React.FC<UserListProps> = ({ setTo, onSubmit }) => {
    const userCtxValue = React.useContext(UserCtx);
    const [selectedUser, setSelectedUser] = React.useState(-1); // 何番目のuserListItemが選択されているか

    const len = Object.keys(userCtxValue.users).length;
    const [classNames, setClassNames] = React.useState([...Array(len)].map(() => { return ''; }));
    const users = Object.values(userCtxValue.users).map((user, i) => {
        return (
            <li key={i}><UserListItem num={i} className={classNames[i]} user={user} onClick={handleClickListItem} /></li>
        )
    });
    

    function handleClickListItem(num: number, userId: string) {
        setTo(userId);
        if (selectedUser < 0 || selectedUser === num) {
            let new_classNames = classNames;
            new_classNames[num] = 'selected';
            setClassNames(new_classNames);
            setSelectedUser(num);
            return;
        }
        
        let new_classNames = classNames;
        new_classNames[selectedUser] = '';
        new_classNames[num] = 'selected';
        setClassNames(new_classNames);
        setSelectedUser(num);
        
    }

    return (
        <div className='user-list-container'>
            <h3>送金可能なユーザ</h3>
            <ul className='user-list'>
                { users }
            </ul>
            <Button className='submit' value='決定' onClick={onSubmit} />
        </div>
    )
}

type UserListItemProps = {
    num: number,
    className: string,
    user: User,
    onClick: (id: number, userId: string) => void
};
/**
 * 
 * @param {number} num  
 * @returns 
 */
const UserListItem: React.FC<UserListItemProps> = ({num, user, className, onClick}) => {
    function handleClick() {
        onClick(num, user.id);
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
    onSend: () => void,
    onCancel: () => void
};
/**
 * 
 * @param to 誰にfunnyを送るか
 * @param funny 送るfunnyの値
 * @param onSend 送金ボタンが押された時の処理
 * @param onCancel キャンセルボタンが押された時の処理
 * @returns 
 */
const ConfirmTx: React.FC<ConfirmTxProps> = ({ to, funny, onSend, onCancel }) => {
    const userCtxValue = React.useContext(UserCtx);
    const user = userCtxValue.users[to];

    if (!userCtxValue.currentUser) return null;

    return (
        <div className='confirm-tx center'>
            <h4>以下の内容でトランザクションを作成します。</h4>
            <h4>送金をクリックするとトランザクションが確定します。</h4>
            <p>※この操作は元に戻せません。</p>
            <table className='tx-table'>
                <tbody>
                    <tr>
                        <th className='th'>送金元</th>
                        <td>
                            <div className='user-info'>
                                <img src={userCtxValue.currentUser.img} alt='user image' />
                                <div>
                                    <p>id: &emsp;&nbsp;<span className='bold'>{userCtxValue.currentUser.id}</span></p>
                                    <p>名前: <span className='bold'>{userCtxValue.currentUser.name}</span></p>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th className='th'>送金先</th>
                        <td>
                            <div className='user-info'>
                                <img src={user.img} alt='user image' />
                                <div>
                                    <p>id: &emsp;&nbsp;<span className='bold'>{to}</span></p>
                                    <p>名前: <span className='bold'>{user.name}</span></p>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th className='th'>funny</th>
                        <td>
                            <p><span className='bold'>{ funny }</span> funny</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='btn-container'>
                <Button className='cancel' value='キャンセル' onClick={onCancel} />
                <Button className='submit' value='送金' onClick={onSend} />
            </div>
        </div>
    )
}


export default Wallet;  
