import React from "react";
import Mask, { MaskCtx, MaskCtxProvider } from './Mask';
import { FlashMessage } from './generals';

type Props = {
    children: JSX.Element[]
};

interface DescriptionsContextInterfece {
    descriptions: { [key: string]: JSX.Element },
    addDescription: (key: string, desc: JSX.Element) => void
    removeDescription: (key: string) => void,
    callFlashMessage: (message: string, type: string) => void,
}

function useDescriptions() {
    const [descriptions, setDescriptions] = React.useState({} as { [key: string]: JSX.Element });
    function addDescription(key: string, desc: JSX.Element) {
        setDescriptions((prev) => {
            return {
                ...prev,
                [key]: desc
            }
        });
    }
    
    function removeDescription(key: string) {
        setDescriptions((prev) => {
            delete prev[key];
            return {
                ...prev
            }
        });
    }

    function callFlashMessage(message: string, type: string) {
        const flashMessage = <FlashMessage key='id' message={message} type={type} />
        const id = 'flash-message';
        addDescription(id, flashMessage);
        setTimeout(() => {
            removeDescription(id);
        }, 10000);
    }

    return {
        descriptions,
        addDescription,
        removeDescription,
        callFlashMessage
    }
}

/**
 * マスクの上に表示するコンポーネントを管理するコンテクスト
 */
export const DescriptionsCtx = React.createContext({} as DescriptionsContextInterfece);
const DescriptionsViewer: React.FC<Props> = ({ children }) => {
    const value = useDescriptions();
    
    // MaskCtxProviderとMaskが別なのは気持ち悪い...
    return (
        <MaskCtxProvider>
            <DescriptionsCtx.Provider value={value}>
                {children}
                <Mask/>
                {Object.values(value.descriptions)}
            </DescriptionsCtx.Provider>
        </MaskCtxProvider>
    )
}

export default DescriptionsViewer;
