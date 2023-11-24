import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './auth/forms/Login'
import Register from './auth/forms/Register'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import{ Home,AllUsers,EditPost,PostDetails,Saved,UpdateProfile,LikedPosts,Explore,CreatePost,Profile }from './root/pages/index.ts'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"


const App = () => {
  return (

    <main className ='flex h-screen'>

      <Routes>
        <Route element = {<AuthLayout/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          </Route>
        <Route element = {<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/all-users' element={<AllUsers/>}/>
            <Route path='/create-post' element={<CreatePost/>}/>
            <Route path='/update-post/:id' element={<EditPost/>}/>
            <Route path='/posts/:id' element={<PostDetails/>}/>
            <Route path='/profile/:id/*' element={<Profile/>}/>
            <Route path='/likedposts' element={<LikedPosts/>}/>
            <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
            </Route>

      </Routes>
      <Toaster />

    </main>

  )
}

export default App