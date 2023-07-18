import{
    Navigate,
    useLocation
}from "react-router-dom"

export const setToken = (token) => {
    localStorage.setItem("auth_token", token);
}

export const fetchToken = (token) => {
    return localStorage.getItem('auth_token')
}

export function RequireToken( {children}){
    let auth = fetchToken()
    let location =useLocation()

    if(!auth){
        return <Navigate to='/' state={{from: location}}/>
    }
    return children;
}