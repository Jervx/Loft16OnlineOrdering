import { lazy } from 'react'
// Pages
const Signin = lazy(() => import("../Pages/Public/Signin"))
const PublicContainer = lazy(() => import("../Pages/Public/PublicContianer"))
const AdminContianer = lazy(() => import("../Pages/Admin/AdminContainer"))

// App Routes 
const ROUTERS = [
    {
        path: "/signin",
        component: Signin,
    },
    {
        path: "/home/*",
        component: PublicContainer,
    },
    {
        path: "/admin",
        component: AdminContianer,
    }
]

export default ROUTERS