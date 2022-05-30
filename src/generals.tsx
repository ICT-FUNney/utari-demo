import React from "react";

// ボタン
type ButtonProps = {
    className: string,
    value: string,
    onClick: () => void
};
export const Button: React.FC<ButtonProps> = ({className, value, onClick}) => {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            {value}
        </button>
    )
}

// フラッシュメッセージ
type FlashMessageProps = {
    message: string,
    type: string
};
export const FlashMessage: React.FC<FlashMessageProps> = ({ message, type }) => {
    return (
        <div className={`flash-message ${type}`}>
            <p className='center'>{message}</p>
        </div>
    )
}
