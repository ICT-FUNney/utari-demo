import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlockChain from './BlockChain/BlockChain';
import StartTx from './StartTx/StartTx';
import DescriptionsViewer from './Descriptions'
import './css/App.css';

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
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<StartTx />}/>
                        <Route path='/block-chain' element={<BlockChain />}/>
                    </Routes>
                </BrowserRouter>
            </DescriptionsViewer>
        </div>
    );  
}

export default App;
