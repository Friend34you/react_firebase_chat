import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {privateRoutes, publicRoutes} from "../routes";
import Chat from "./Chat";

const AppRouter = () => {
    const user = true
    return user ?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    <Route path={path} element={Component}/>)}
                <Route
                    path="*"
                    element={<Navigate to={`${CHAT_ROUTE}`} />}
                />
            </Routes>
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route path={path} element={Component}/>)}
                <Route
                    path="*"
                    element={<Navigate to={`${LOGIN_ROUTE}`} />}
                />
            </Routes>
        );
};

export default AppRouter;