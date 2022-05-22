import React from 'react';


interface MaskContextInterface {
    displayMask: boolean,
    setDisplayMask: React.Dispatch<React.SetStateAction<boolean>>,
    maskElement: HTMLElement | null,
    setMaskElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    methodsOnDisappear: any[], //関数の配列にしたい
    setMethodsOnDisappear: React.Dispatch<React.SetStateAction<any[]>>, //関数の配列にしたい
    disappear: () => void
}

function useMask() {
    const [displayMask, setDisplayMask] = React.useState(false);
    const [maskElement, setMaskElement] = React.useState(document.getElementById('app-mask'));
    const [methodsOnDisappear, setMethodsOnDisappear] = React.useState(Array<any>());
    
    function disappear() {
        for (const method of methodsOnDisappear) {
            method();
        }
        setMethodsOnDisappear([]);
        setDisplayMask(false);
    }

    return {
        displayMask,
        setDisplayMask,
        maskElement,
        setMaskElement,
        methodsOnDisappear,
        setMethodsOnDisappear,
        disappear
    }
}

export const MaskCtx = React.createContext({} as MaskContextInterface);

type Props = {
    children: JSX.Element
};

const Mask: React.FC = () => {
    const value = React.useContext(MaskCtx);
    
    function handleClick() {
        value.disappear();
    }

    React.useEffect(() => {
        const maskElement = document.getElementById('app-mask');
        if (maskElement) {
            value.setMaskElement(maskElement);
        }
    });

    const mask = (value.displayMask) ? <div id='app-mask' onClick={handleClick}></div> : null;
    return mask;
}

export const MaskCtxProvider: React.FC<Props> = ({children}) => {
    const maskValue = useMask();
    return (
        <MaskCtx.Provider value={maskValue}>
            {children}
        </MaskCtx.Provider>
    )
}

export default Mask;
