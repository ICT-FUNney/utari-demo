import React from 'react';
import '../css/StartTx/MemberNode.css';

type Props = {
    num: number
};
const MemberNode: React.FC<Props> = ({ num }) => {
    return (
        <div className='member-node'>
            <h2>メンバーノード</h2>
            <h3>{ num }</h3>
        </div>
    )
}

export default MemberNode;
