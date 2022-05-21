import React from "react";

// ボタン
type ButtonProps = {
    className: string,
    value: string,
    onClick: () => void
};
export const Button: React.FC<ButtonProps> = ({className, value, onClick}) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    )
}

// フォームをcomponent化したいけど利便性に欠ける
// interface Labelnterface {
//     type: string,
//     name: string,
//     text: string,
//     value: string
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
// }
// type FormProps = {
//     labels: Labelnterface[],
//     onSubmit: React.FormEventHandler,
//     submitText: string
// };
// export const Form: React.FC<FormProps> = ({ labels, onSubmit, submitText }) => {
    
//     const labelElements = labels.map((label, i) => {
//         return (
//             <label key={ i }>
//                 {label.text}<br/>
//                 <input type={label.type} name={label.name} value={label.value} onChange={ label.onChange } />
//             </label>
//         )
//     });

//     return (
//         <form onSubmit={onSubmit} autoComplete='off'>
//             {labelElements}
//             <input type='submit' value={ submitText } />
//         </form>
//     )
// }

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
