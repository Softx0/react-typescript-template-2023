import React, {lazy, Suspense} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import store from './redux/store';

//Routes
const Login = lazy(() => import('./pages/Login/Login'));

const App = () => {
    return (
        <React.StrictMode>
            <Suspense fallback={<div>Loading ...</div>}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route
                                path="home"
                                element={<Navigate to={`login`} />}
                            />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </Suspense>
        </React.StrictMode>
    );
};

export default App;
