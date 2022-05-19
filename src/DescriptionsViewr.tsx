import React from "react";

type Props = {
    children: JSX.Element
};

interface DescriptionsContextInterfece {
    descriptions: JSX.Element[],
    setDescriptions: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}

function useDescriptions() {
    const [descriptions, setDescriptions] = React.useState(new Array<JSX.Element>());
    return {
        descriptions,
        setDescriptions
    }
}

export const DescriptionsContext = React.createContext({} as DescriptionsContextInterfece);
const DescriptionsViewer: React.FC<Props> = ({ children }) => {
    const value = useDescriptions();

    return (
        <DescriptionsContext.Provider value={value}>
            {children}
            {value.descriptions}
        </DescriptionsContext.Provider>
    )
}

export default DescriptionsViewer;
