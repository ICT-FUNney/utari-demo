import '../css/StartTx/LogList.css';

const LogList: React.FC = () => {
    const logParams = [
        { who: "You", action: "Txの処理開始", func: "func()" },
        { who: "You", action: "リーダーノードに渡す", func: "func()" },
        { who: "リーダーノード", action: "電子証明確認", func: "func()" },
        { who: "リーダーノード", action: "3つのメンバーノードに渡す", func: "func()" },
        { who: "メンバーノード1, 2, 3", action: "電子署名確認", func: "func()" },
        { who: "メンバーノード1, 2, 3", action: "他のメンバーノードに渡す", func: "func()" },
        { who: "メンバーノード1, 2, 3", action: "リーダーノードに結果を返す", func: "func()" },
        { who: "リーダーノード", action: "TxPoolに送る", func: "func()" },
        // リーダーが定期実行
        {who: "リーダーノード", action: "originブロック作成", func: "func()"},
        {who: "リーダーノード", action: "originブロック作成", func: "func()"},
        {who: "リーダーノード", action: "Txのhashmap作成", func: "func()"},
        {who: "リーダーノード", action: "ブロック作成", func: "func()"},
        {who: "リーダーノード", action: "各メンバーノードに渡す", func: "func()"},
        {who: "メンバーノード", action: "ハッシュ値計算", func: "func()"},
        {who: "メンバーノード", action: "リーダーノードに結果を返す", func: "func()"},
        {who: "リーダーノード", action: "ブロックチェーンに記載", func: "func()"},

    ];

    const logs = logParams.map((log, i) => {
        return <li key={i}><Log props={log}/></li>
    });

    return (
        <div className='log-list-container'>
                <ol className='log-list'>
                    {logs}
                </ol>
        </div>
    )
}

interface LogPropsInterface {
    who: string,
    action: string,
    func: string
}
type LogProps = {
    props: LogPropsInterface
};
const Log: React.FC<LogProps> = ({props}) => {
    return (
        <div className='log-list-item'>
            <p className='action'>{props.action}</p>
            <ul>
                <li className='who'>{props.who}</li>
                <li className='func'>{props.func}</li>
            </ul>
        </div>
    )
}

export default LogList;
