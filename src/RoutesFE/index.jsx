import Home from '../Pages/Home'
import CreatePostRoute from '../Pages/CreatePostRoute'
import Profile from '../Pages/Profile'
import SignInRoute from '../Pages/SignInRoute'
import SignUp from '../Pages/SignUp'
import LoginRoute from '../Pages/LoginRoute'

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/create-post', component:  CreatePostRoute},
    { path: '/profile', component:  Profile},
    { path: '/sign-in', component:  SignInRoute},
    { path: '/sign-up', component:  SignUp},
    { path: '/login', component:  LoginRoute},
]

export const privateRoutes = [

]