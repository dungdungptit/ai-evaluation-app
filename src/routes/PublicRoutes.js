import { Navigate, Outlet } from 'react-router-dom'


const useAuth = () => {
    const user = localStorage.getItem('user')
    console.log(JSON.parse(user));
    if (user && JSON.parse(user).roles.includes('admin')) {
        return "admin";
    } else if (user && JSON.parse(user).roles.includes('user')) {
        return "user";
    } else {
        return false;
    }
}


const PublicRoutes = () => {

    const auth = useAuth()
    console.log(auth);
    if (auth === "admin") {
        return <Navigate to="/admin/problems" />
    } else if (auth === "user") {
        return <Navigate to="/problems" />
    } else {
        return <Outlet />
    }
        // return auth ? <Navigate to="/admin" /> : <Outlet />
    // }
    // else if(auth && auth.roles.includes('user')){
        // return auth ? <Navigate to="/problems" /> : <Outlet />
    // }  
}


export default PublicRoutes;