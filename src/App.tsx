import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopPage from './TopPage';
import Login from './Login';
import BlockChain from './BlockChain/BlockChain';
import StartTx from './StartTx/StartTx';
import DescriptionsViewer from './Descriptions';
import Header from './Header';
import { useUser, UserCtx } from './User';
import Page404 from './Page404';
import './css/App.css';

function App() {
    return (
        <div className='App'>
            <UserCtx.Provider value={ useUser() }>
                <DescriptionsViewer>
                    <Header/>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<TopPage />}/>
                            <Route path='/login' element={<Login />}/>
                            <Route path='/start-tx' element={<StartTx />}/>
                            <Route path='/block-chain' element={<BlockChain />}/>
                            <Route path='*' element={<Page404 />}/>
                        </Routes>
                    </BrowserRouter>
                </DescriptionsViewer>
            </UserCtx.Provider>
        </div>
    );  
}

export default App;
