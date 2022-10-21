import { useRoutes } from "react-router-dom";
import Layout from '../layouts';
import Problems from '../pages/Problems';
import Status from '../pages/Status';
import History from '../pages/History';
import Guide from '../pages/Guide';
import Contact from '../pages/Contact';
import ProblemItem from '../fearutes/problems/ProblemItem';
import Page404 from "../pages/Page404";

const Route = () => useRoutes([
    {
        path: '',
        element: <Layout />,
        children: [
            { path: '', element: <Problems /> },
            { path: 'problems/:id', element: <ProblemItem /> },
            { path: 'status', element: <Status /> },
            { path: 'history', element: <History /> },
            { path: 'guide', element: <Guide /> },
            { path: 'contact', element: <Contact /> },
            { path: '*', element: <Page404 to="/404" /> }
        ]
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: 'register',
        element: <Register />,
    },
    {
        path: '*',
        element: <Page404 to="/404" />
    }
]);


export default Route;

/* 

*/