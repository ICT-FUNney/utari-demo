import React from "react";
import Mask, {MaskCtxProvider} from './Mask';

type Props = {
    children: JSX.Element
};

interface DescriptionsContextInterfece {
    descriptions: { [key: string]: JSX.Element },
    addDescription: (key: string, desc: JSX.Element) => void
    removeDescription: (key: string) => void,
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

    return {
        descriptions,
        addDescription,
        removeDescription,
    }
}

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
