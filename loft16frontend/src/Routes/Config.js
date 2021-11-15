import { lazy } from 'react'
// Landing page 
const Login = lazy(() => import("../Pages/Public/Login"))
const Home = lazy(() => import("../Pages/Public/Home"))
const Signup = lazy(() => import("../Pages/Public/Signup"))
const NotFound = lazy(() => import("../Pages/Public/NotFound"))
const Product_View = lazy(() => import("../Pages/Public/Product_View"))
const Products = lazy(() => import("../Pages/Public/Products"))


// Portfolio Page 
const ROUTERS = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: Home,
    },
    {
        path: "/signup",
        component: Signup,
    },
    {
        path: "/productview",
        component: Product_View,
    },
    {
        path: "/products",
        component: Products,
    },
    {
        path: "/notfound",
        component: NotFound,
    }
]

export default {
    ROUTERS
}