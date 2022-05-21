import React from 'react';
import { Button} from '../generals';
import { DescriptionsCtx } from '../Descriptions';
import { MaskCtx } from '../Mask';

import '../css/StartTx/Wallet.css';

const Wallet: React.FC = () => {
    const [to, setTo] = React.useState('');
    const [funny, setFunny] = React.useState('');
    const descValue = React.useContext(DescriptionsCtx);
    const maskValue = React.useContext(MaskCtx);
    const labels = [
        {
            type: 'string',
            name: 'to',
            text: '宛先 (ID):',
            value: to,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setTo(e.target.value); }
        },
        {
            type: 'string',
            name: 'funny',
            text: 'funny:',
            value: funny,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => { setFunny(e.target.value); }
        },
    ];

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
        const key = 'confirm-tx';
        const confirmTx = <ConfirmTx key={ key } to={ to } funny={ funny } />
        descValue.addDescription(key, confirmTx);
        maskValue.setDisplayMask(true);
        maskValue.setMethodsOnDisappear((prev) => {
            return [
                ...prev,
                () => { descValue.removeDescription(key); }
            ];
        });
        // setTo('');
        // setFunny('');
    }

    const labelElements = labels.map((label, i) => {
        return (
            <label key={i}>
                {label.text}<br/>
                <input type={label.type} name={label.name} value={label.value} onChange={label.onChange} />
            </label>
        )
    });

    return (
        // <div className='wallet center'>
        <div className='wallet'>
            <h2>Generate Transaction!!</h2>
            <form onSubmit={handleSubmit as React.FormEventHandler} autoComplete='off'>
                {labelElements}
                <input className='submit' type='submit' value='確認' />
            </form>
        </div>
    )
}


type ConfirmTxProps = {
    to: string,
    funny: string
};
const ConfirmTx: React.FC<ConfirmTxProps> = ({ to, funny }) => {
    
    function handleClick() {
        console.log("送金!");
    }
    
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
            <Button className='submit' value='送金' onClick={handleClick} />
        </div>
    )
}


export default Wallet;  
