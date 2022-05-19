import React from "react";

type ButtonProps = {
    className: string,
    text: string,
    onClick: () => void
};
export const Button: React.FC<ButtonProps> = ({className, text, onClick}) => {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    )
}
