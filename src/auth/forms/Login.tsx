import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast"
import {Link,useNavigate} from 'react-router-dom'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { logInFormSchema } from '@/lib/validation';
import Loader from '@/components/ui/shared/Loader';
import { useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';


const Login = () => {
  //set toast
  const { toast } = useToast();
  const navigate = useNavigate();
  const{checkAuthUser,isLoading: isUserLoading}= useUserContext()

  const {mutateAsync : signInAccount, isPending: isLoading} = useSignInAccountMutation();
   // 1. Define your form.
   const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
            email: "",
      password: "",
    },
  });
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof logInFormSchema>) {
    // Do something with the form values.

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })
    if(!session){
       toast({title: 'Login in failed .Please try again'})
       return
    }
    const isLoggedIn = await checkAuthUser()
    // ✅ This will be type-safe and validated.
    if(isLoggedIn){
form.reset()

navigate('/')

    }
    else{
           toast({title: 'Login in failed .Please try again'})
           return

    }
  }
  return (
       <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <img src='/assets/images/logo.svg' alt='logo'/>
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'> Log in to your account</h2>
          <p className='text-light-3 small-medium md:base-regular'> Welcome back enter your details to continue</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
       
      
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input   type='text' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className='shad-button_primary'>
          { isUserLoading || isLoading ? (<div className='flex-center gap-2'>
            <Loader/> Loading...
            </div>)
          :
          "Log In"}
        </Button>
        <p className='text-small-regular text-align-2 text-center mt-2'>Don't have an account?
        <Link to ='/register' className='text-primary-500 text-small-semibold ml-1'>Sign Up</Link></p>
      </form>
              </div>

    </Form>

  )
}

export default Login