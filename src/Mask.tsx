import React from 'react';


interface MaskContextInterface {
    displayMask: boolean,
    setDisplayMask: React.Dispatch<React.SetStateAction<boolean>>
    maskElement: HTMLElement | null,
    setMaskElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    methodsOnDisappear: any[] //関数の配列にしたい
    setMethodsOnDisappear: React.Dispatch<React.SetStateAction<any[]>> //関数の配列にしたい
}

function useMask() {
    const [displayMask, setDisplayMask] = React.useState(false);
    const [maskElement, setMaskElement] = React.useState(document.getElementById('app-mask'));
    const [methodsOnDisappear, setMethodsOnDisappear] = React.useState(Array<any>());
    return {
        displayMask,
        setDisplayMask,
        maskElement,
        setMaskElement,
        methodsOnDisappear,
        setMethodsOnDisappear,
    }
}

export const MaskCtx = React.createContext({} as MaskContextInterface);

type Props = {
    children: JSX.Element
};

const Mask: React.FC<Props> = ({ children }) => {
    const value = useMask();
    
    function handleClick() {
        for (const method of value.methodsOnDisappear) {
            method();
        }
        value.setMethodsOnDisappear([]);
        value.setDisplayMask(false);
    }

    React.useEffect(() => {
        const maskElement = document.getElementById('app-mask');
        if (maskElement) {
            value.setMaskElement(maskElement);
        }
    });

    const mask = (value.displayMask) ? <div id='app-mask' onClick={handleClick}></div> : null;
    return (
        <MaskCtx.Provider value={value}>
            {mask}
            {children}
        </MaskCtx.Provider>
    )
}
export default Mask;
