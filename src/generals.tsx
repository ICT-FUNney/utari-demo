import React from "react";

type ButtonProps = {
    className: string,
    value: string,
    onClick: () => void
};
/**
 * ボタンを抽象化
 * @param className デザイン指定
 * @param value ボタンの中のテキスト
 * @param onClick クリックされた時の処理
 * @returns {HTMLElement}
 */
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
/**
 * Tx送信時の成功・失敗などを表示する
 * @param message 表示したいメッセージ
 * @param type デザイン指定
 * @returns 
 */
export const FlashMessage: React.FC<FlashMessageProps> = ({ message, type }) => {
    return (
        <div className={`flash-message ${type}`}>
            <p className='center'>{message}</p>
        </div>
    )
}
