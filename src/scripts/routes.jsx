import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Table from './Table'

const MyRoutes = () => (
    <BrowserRouter basename="/test">
        <Routes>
            <Route exact path="/" element={<Table />}/>
        </Routes>
    </BrowserRouter>
    )

export default MyRoutes;
