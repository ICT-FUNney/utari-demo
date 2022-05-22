import React from 'react';
import { UserCtx } from './User';
import { DescriptionsCtx } from './Descriptions';
import './css/Login.css';

const Login: React.FC = () => {
    const [id, setId] = React.useState('');
    const [password, setPassword] = React.useState(''); //passwordは平文のまま管理していいのか？
    const userCtxValue = React.useContext(UserCtx);
    const descCtxValue = React.useContext(DescriptionsCtx);
    
    function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
    }
    
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        
        const loginSuccessed = userCtxValue.login(id, password); //今の所すべてtrue
        
        if (loginSuccessed) {
            descCtxValue.callFlashMessage('正常にログインできました。', 'success'); //一瞬で画面変わるからほとんど表示されない
            window.location.href = "/start-tx"; //トランザクション作成画面へ
        } else {
            descCtxValue.callFlashMessage('IDまたはパスワードが正しくありません。', 'alert');
        }
    }

    return (
        <div className='login'>
            <h2>ログインしてください。</h2>
            <form className='login-form' onSubmit={handleSubmit as React.FormEventHandler}>
                <label>
                    ID:<br/>
                    <input type="text" name='id' value={id} onChange={handleIdChange} />
                </label>

                <label>
                    password:<br/>
                    <input type="password" name='password' value={password} onChange={handlePasswordChange} />
                </label>

                <input className='submit' type="submit" value='ログイン'/>
            </form>
        </div>
    )
}



export default Login;
