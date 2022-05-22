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
        <UserCtx.Provider value={ useUser() }>
                <DescriptionsViewer>
                <div className='App'>
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
                </div>
            </DescriptionsViewer>
        </UserCtx.Provider>
    );  
}

export default App;
