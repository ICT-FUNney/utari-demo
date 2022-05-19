import React from "react";
import '../css/Tx.css';
import { MaskCtx } from "../Mask";
import { DescriptionsCtx } from '../Descriptions';
import { Button } from '../generals';

type BlockProps = {
    nth: number //何番目に作られたブロックか
};

const Tx: React.FC<BlockProps> = ({ nth }) => {
    
    const maskValue = React.useContext(MaskCtx); //消したい
    const descriptionsValue = React.useContext(DescriptionsCtx);
    const txId = 'tx' + nth;
    function handleClick() {
        const txDesc = <TxDescription key={txId} nth={nth} onDisappear={ onDescDisappear } />;
        
        maskValue.setMethodsOnDisappear((prev) => {
            return [
                ...prev,
                onDescDisappear
            ];
        });
        descriptionsValue.addDescription(txId, txDesc);
    }
    
    function onDescDisappear() {
        descriptionsValue.removeDescription(txId);
    }
    
    return (
        <div className='tx-container'>
            <div className='tx' onClick={handleClick}>
                <h3>{nth + 1}</h3>
            </div>
        </div>
    )
}

type BlockDescProps = {
    nth: number, //何番目に作られたブロックか
    onDisappear: () => void
};
const TxDescription: React.FC<BlockDescProps> = ({ nth, onDisappear }) => {
    return (
        <div className='tx-desc center'>
            <h3>トランザクション{nth + 1}の情報</h3>
            <ul>
                <details>
                    <summary>バージョン</summary>
                    xxxx
                </details>
                <details>
                    <summary>インプット</summary>
                    xxxxxx
                </details>
                <details>
                    <summary>アウトプット</summary>
                    xxxxxx
                </details>
                <details>
                    <summary>ロックタイム</summary>
                    xxxxxx
                </details>
            </ul>
            <Button className='close-button' text='X' onClick={onDisappear}/>
        </div>
    )
}

export default Tx;
