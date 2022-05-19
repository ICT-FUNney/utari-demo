import React from 'react';
import './css/Block.css';
import Tx from './Tx';
import { MaskCtx } from './Mask';
import { DescriptionsCtx } from './Descriptions';

type Props = {
    nth: number //何番目に作られたブロックか
};

const Block: React.FC<Props> = ({ nth }) => {
    
    const maskValue = React.useContext(MaskCtx); //消したい
    const descriptionsValue = React.useContext(DescriptionsCtx);
    const blockId = "block" + nth;
    
    function handleClick() {
        const blockDesc = <BlockDescription key={ blockId } nth={nth} />
        
        maskValue.setDisplayMask(true);
        maskValue.setMethodsOnDisappear((prev) => {
            return [
                ...prev,
                () => { descriptionsValue.removeDescription(blockId); }
            ];
        });
        descriptionsValue.addDescription(blockId, blockDesc);
    }


    return (
        <div className='block-container'>
            <div className='block' onClick={handleClick}>
                <div className='nth'>{nth + 1}</div>
            </div>
        </div>
    );
};

const BlockDescription: React.FC<Props> = ({ nth }) => {
    return (
        <div className='block-desc center'>
            <div className='block-title'>
                <h2>ブロック{nth + 1}のトランザクション一覧</h2>
            </div>
            <ol>
                {[...Array(15)].map((_, i) => <li key={i}><Tx nth={i} /></li>)}
            </ol>
        </div>
    )
};

export default Block;
