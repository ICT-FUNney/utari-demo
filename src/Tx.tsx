import React from "react";
import './css/Tx.css';
import { MaskCtx } from "./Mask";

type Props = {
    nth: number //何番目に作られたブロックか
};

const Tx: React.FC<Props> = ({ nth }) => {
    const [isDescribed, setIsDescribed] = React.useState(false);
    const txDesc = (isDescribed) ? <TxDescription nth={nth} /> : null;
    const maskValue = React.useContext(MaskCtx);
    function handleClick() {
        setIsDescribed(true);
        let methods = maskValue.methodsOnDisappear;
        methods.push(() => { setIsDescribed(false) });
        maskValue.setMethodsOnDisappear(methods);
    }

    return (
        <div className='tx-container'>
            <div className='tx' onClick={handleClick}>
                <h3>{nth}</h3>
            </div>
            {txDesc}
        </div>
    )
}


const TxDescription: React.FC<Props> = ({nth}) => {
    return (
        <div className='tx-desc'>
            <h3></h3>
        </div>
    )
}

export default Tx;
