import React from 'react';
import BlockChain from './BlockChain';
import Mask from './Mask';
import DescriptionsViewer from './DescriptionsViewr'
import './css/App.css';
// import LeaderLine from 'leader-line-new';

function App() {
    React.useEffect(() => {
        const appMask = document.getElementById('app-mask');
        if (appMask) {
            appMask.onclick = () => { appMask.classList.add('invisible'); };
        }
    }, []);
  
    return (
        <div className='App'>
            <DescriptionsViewer>
                <Mask>
                    <BlockChain />
                </Mask>
            </DescriptionsViewer>
        </div>
    );  
}

export default App;
