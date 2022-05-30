import React, { useEffect } from 'react';
import Wallet from './Wallet';
import LeaderNode from './LeaderNode';
import MemberNode from './MemberNode';
import TxPool from './TxPool';
import '../css/StartTx/StartTx.css';
import { UserCtx } from '../User';

const StartTx: React.FC = () => {
    const userCtxValue = React.useContext(UserCtx);
    useEffect(() => {
        userCtxValue.login('panda4649', 'xxx'); // 今は取り得ずずっとログインしてる状態にしておく
    }, []);
    
    userCtxValue.checkLogin();

    return (
        <div className='start-tx'>
            <Wallet />
            <TxPool />
            <LeaderNode />
            <div className='member-node-container'>
                {[...Array(3)].map((_, i) => <MemberNode key={ i } num={ i } />)}
            </div>
        </div>
    )
}

export default StartTx;
