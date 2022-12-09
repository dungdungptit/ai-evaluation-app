import { Navigate, Outlet } from 'react-router-dom'


const useAuth = () => {
    const user = localStorage.getItem('user')
    console.log(JSON.parse(user));
    if (user && JSON.parse(user).role.includes('admin')) {
        return "admin";
    } else if (user && JSON.parse(user).role.includes('user')) {
        return "user";
    } else {
        return false;
    }
}


const PublicRoutes = () => {

    const auth = useAuth()
    console.log(auth);
    if (auth === "admin" || auth === "superadmin") {
        return <Navigate to="/admin/problems" />
    } else if (auth === "user") {
        return <Navigate to="/problems" />
    } else {
        return <Outlet />
    }
        // return auth ? <Navigate to="/admin" /> : <Outlet />
    // }
    // else if(auth && auth.role.includes('user')){
        // return auth ? <Navigate to="/problems" /> : <Outlet />
    // }  
}


export default PublicRoutes;