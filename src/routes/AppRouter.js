import React from 'react'
import Layout from '../layouts';
import Problems from '../pages/Problems';
import History from '../pages/History';
import Guide from '../pages/Guide';
import Contact from '../pages/Contact';
import ProblemItem from '../pages/ProblemItem';
import Page404 from "../pages/Page404";
import Login from "../pages/Login";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';
import { Users, UserItem, UserEdit, UserNew } from '../pages/admin/user';
import { ProblemItemNew, AdminProblems, AdminProblemItem, ProblemItemEdit } from '../pages/admin/problem';
import Register from '../pages/Register';
import { GroupEdit, GroupItem, GroupNew, Groups } from '../pages/admin/group';
import Subgroups from '../pages/admin/subgroup/Subgroups';
import { SubgroupEdit, SubgroupItem, SubgroupNew } from '../pages/admin/subgroup';
import { Submissions } from '../pages/admin/submission';

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
    console.log(auth);

    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="" element={<Layout />}>
                    <Route index element={!!auth && auth.role.includes('admin') ? <AdminProblems /> : <Problems />} />
                    {!!auth && auth.role.includes('admin') && <Route path="admin" element={<AdminProblems />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems" element={<AdminProblems />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems/:id" element={<AdminProblemItem />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems/add" element={<ProblemItemNew />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/problems/edit/:id" element={<ProblemItemEdit />} />}

                    {!!auth && auth.role.includes('admin') && <Route path="admin/users" element={<Users />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/users/:id" element={<UserItem />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/users/add" element={<UserNew />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/users/edit/:id" element={<UserEdit />} />}

                    {!!auth && auth.role.includes('admin') && <Route path="admin/group" element={<Groups />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/group/:id" element={<GroupItem />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/group/add" element={<GroupNew />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/group/edit/:id" element={<GroupEdit />} />}

                    {!!auth && auth.role.includes('admin') && <Route path="admin/subgroup" element={<Subgroups />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/subgroup/:id" element={<SubgroupItem />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/subgroup/add" element={<SubgroupNew />} />}
                    {!!auth && auth.role.includes('admin') && <Route path="admin/subgroup/edit/:id" element={<SubgroupEdit />} />}

                    {!!auth && auth.role.includes('admin') && <Route path="admin/submission" element={<Submissions />} />}

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