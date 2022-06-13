import React, { useEffect } from 'react';
import Wallet from './Wallet';
import LeaderNode from './LeaderNode';
import MemberNode from './MemberNode';
import TxPool from './TxPool';
import { UserCtx } from '../User';
import LogList from './LogList';
import '../css/StartTx/StartTx.css';

/**
 * ユーザがTxを入力し、ブロックチェーンに取り込まれるまでの一連の流れを表示する画面
 * @returns {HTMLElement}
 */
const StartTx: React.FC = () => {
    const userCtxValue = React.useContext(UserCtx);
    useEffect(() => {
        userCtxValue.login('panda4649', 'xxx'); // 今は取りあえず、常にログイン状態にしておく
    }, []);
    
    userCtxValue.checkLogin();

    const memberNodes = <div className='member-nodes-container'>
        {[...Array(3)].map((_, i) => { return <MemberNode key={i} num={i + 1} /> })}
    </div>

return (
    <div className='start-tx'>
            <Wallet />
            <LeaderNode />
            {memberNodes}   
            <TxPool />
            <LogList />
        </div>
    )
}

export default StartTx;
