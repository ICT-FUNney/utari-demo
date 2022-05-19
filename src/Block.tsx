import React from 'react';
import './css/Block.css';
import Tx from './Tx';
import { MaskCtx } from './Mask';

type Props = {
    nth: number //何番目に作られたブロックか
};

const Block: React.FC<Props> = ({nth}) => {
    const [isDescribed, setIsDescribed] = React.useState(false);
    const blockDesc = (isDescribed) ? <BlockDescription nth={nth} /> : null;
    const maskValue = React.useContext(MaskCtx);

    function handleClick() {
        setIsDescribed(true);
        maskValue.setDisplayMask(true);
        let methods = maskValue.methodsOnDisappear;
        methods.push(() => { setIsDescribed(false) });
        maskValue.setMethodsOnDisappear(methods);
    }

    return (
        <div className='block-container'>
            <div className='block' onClick={handleClick}>
            <div className='nth'>{nth}</div>
            </div>
            {blockDesc}
        </div>
    )
};

const BlockDescription: React.FC<Props> = ({nth}) => {
    return (
        <div className='block-desc'>
            <div className='block-title'>
                <h2>ブロック{nth}のTx一覧</h2>
            </div>
            <ol>
                {[...Array(15)].map((_, i) => <li key={i}><Tx nth={i + 1} /></li>)}
            </ol>
        </div>
    )
};

export default Block;
