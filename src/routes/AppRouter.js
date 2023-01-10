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
import { Admins, AdminItem, AdminEdit, AdminNew } from '../pages/admin/admin';
import { ProblemItemNew, AdminProblems, AdminProblemItem, ProblemItemEdit } from '../pages/admin/problem';
import Register from '../pages/Register';
import { GroupEdit, GroupItem, GroupNew, Groups } from '../pages/admin/group';
import Subgroups from '../pages/admin/subgroup/Subgroups';
import { SubgroupEdit, SubgroupItem, SubgroupNew } from '../pages/admin/subgroup';
import { Submissions, SubmissionItem, SubmissionSample } from '../pages/admin/submission';
import { Datasets, DatasetItem, DatasetNew, DatasetSampleNew } from '../pages/admin/dataset';

const AppRouter = () => {

    const useAuth = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        } else {
            return null
        }
    }

    const isAdmin = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return !!user && JSON.parse(user).role.includes('admin');
        } else {
            return false
        }
    }

    const isSuperAdmin = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return !!user && JSON.parse(user).role.includes('superadmin');
        } else {
            return false
        }
    }

    const auth = useAuth();
    console.log(auth);

    return (
        <Routes>
            <Route element={<ProtectedRoutes />}>
                <Route path="" element={<Layout />}>
                    <Route index element={(isAdmin() || isSuperAdmin()) ? <AdminProblems /> : <Problems />} />
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin" element={<AdminProblems />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/problems" element={<AdminProblems />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/problems/:id" element={<AdminProblemItem />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/problems/add" element={<ProblemItemNew />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/problems/edit/:id" element={<ProblemItemEdit />} />}

                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/users" element={<Users />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/users/:id" element={<UserItem />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/users/add" element={<UserNew />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/users/edit/:id" element={<UserEdit />} />}

                    {isSuperAdmin() && <Route path="admin/admins" element={<Admins />} />}
                    {isSuperAdmin() && <Route path="admin/admins/:id" element={<AdminItem />} />}
                    {isSuperAdmin() && <Route path="admin/admins/add" element={<AdminNew />} />}
                    {isSuperAdmin() && <Route path="admin/admins/edit/:id" element={<AdminEdit />} />}

                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/group" element={<Groups />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/group/:id" element={<GroupItem />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/group/add" element={<GroupNew />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/group/edit/:id" element={<GroupEdit />} />}

                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/subgroup" element={<Subgroups />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/subgroup/:id" element={<SubgroupItem />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/subgroup/add" element={<SubgroupNew />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/subgroup/edit/:id" element={<SubgroupEdit />} />}

                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/submission" element={<Submissions />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/submission/:id" element={<SubmissionItem />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/submission/sample/:id" element={<SubmissionSample />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/submission/frame/:id" element={<SubmissionItem />} />}


                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/datasets" element={<Datasets />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/datasets/:id" element={<DatasetItem />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/datasets/add" element={<DatasetNew />} />}
                    {(isAdmin() || isSuperAdmin()) && <Route path="admin/dataset/addsample/:id" element={<DatasetSampleNew />} />}


                    <Route path="problems" element={<Problems />} />
                    <Route path="problems/:id" element={<ProblemItem />} />
                    <Route path="history" element={<History />} />
                    <Route path="guide" element={<Guide />} />
                    <Route path="contact" element={<Contact />} />
                </Route>
                <Route path="*" element={<Page404 to="/404" />} />
            </Route>
            <Route element={<PublicRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
        </Routes>
    )
}

export default AppRouter