import React, { useEffect } from 'react';
import Wallet from './Wallet';
import LeaderNode from './LeaderNode';
import MemberNode from './MemberNode';
import TxPool from './TxPool';
import '../css/StartTx/StartTx.css';
import { UserCtx } from '../User';

const StartTx: React.FC = () => {
    const userCtxValue = React.useContext(UserCtx);
    userCtxValue.checkLogin();
    
    useEffect(() => {
        userCtxValue.login('panda', 'xxx'); // 今は取り得ずずっとログインしてる状態にしておく
    }, []);
    
    return (
        <div className='start-tx'>
            <Wallet />
            <LeaderNode />
            <TxPool />
            <div className='member-node-container'>
                {[...Array(3)].map((_, i) => <MemberNode key={ i } num={ i } />)}
            </div>
        </div>
    )
}

export default StartTx;
