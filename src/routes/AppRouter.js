import React from 'react'
import Layout from '../layouts';
import Problems from '../pages/Problems';
import History from '../pages/History';
import Guide from '../pages/Guide';
import Contact from '../pages/Contact';
import ProblemItem from '../fearutes/problems/ProblemItem';
import Page404 from "../pages/Page404";
import Login from "../pages/Login";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import Users from '../pages/admin/Users';
import ProblemItemNew from '../pages/admin/ProblemItemNew';
import AdminProblems from '../pages/admin/AdminProblems';
import AdminProblemItem from '../pages/admin/AdminProblemItem';
import Register from '../pages/Register';

const AppRouter = () => {

    const useAuth = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        } else {
            return null
        }
    }

    const auth = useAuth();

    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="" element={<Layout />}>
                    <Route index element={!!auth && auth.role.includes('admin') ? <AdminProblems /> : <Problems />} />
                    {!!auth && auth.role.includes('admin') && <Route path="admin" element={<AdminProblems />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems" element={<AdminProblems />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/users" element={<Users />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems/:id" element={<AdminProblemItem />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems/add" element={<ProblemItemNew state={"add"} />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems/edit/:id" element={<ProblemItemNew state={"edit"} />} />}

                    <Route path="problems" element={<Problems />} />
                    <Route path="problems/:id" element={<ProblemItem />} />
                    <Route path="history" element={<History />} />
                    <Route path="guide" element={<Guide />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
                <Route path="*" element={<Page404 to="/404" />} />
            </Route>
            <Route path="*" element={<PublicRoutes />}>
                <Route path='register' element={<Register />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    )
}

export default AppRouter