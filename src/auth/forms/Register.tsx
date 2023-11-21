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
import { registerFormSchema } from '@/lib/validation';
import Loader from '@/components/ui/shared/Loader';
import { useCreateUserAccountMutation, useSignInAccountMutation } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';


const Register = () => {
  //set toast
  const { toast } = useToast();
  const navigate = useNavigate();
  const{checkAuthUser,isLoading: isUserLoading}= useUserContext()

  const {mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccountMutation();
  const {mutateAsync : signInAccount, isPending: isLoggingIn} = useSignInAccountMutation();

   // 1. Define your form.
   const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    const newCreatedUser = await createUserAccount(values)

    if(!newCreatedUser){
    return toast({
      title: "Sign Up failed.Please try again",
    });
  }
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })
    if(!session){
      return toast({title: 'Sigin in failed .Please try again'})
    }
    const isLoggedIn = await checkAuthUser()
    // ✅ This will be type-safe and validated.
    if(isLoggedIn){
form.reset()

navigate('/')

    }
    else{
          return toast({title: 'Sigin in failed .Please try again'})

    }
    console.log(newCreatedUser)
  }
  return (
       <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <img src='/assets/images/logo.svg' alt='logo'/>
          <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'> Create a new account</h2>
          <p className='text-light-3 small-medium md:base-regular'>To use Snapgram enter your details</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input   type='text' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input   type='text' className="shad-input" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
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
        
            <FormField            control={form.control}
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
          { isCreatingUser ? (<div className='flex-center gap-2'>
            <Loader/> Loading...
            </div>)
          :
          "Sign Up"}
        </Button>
        <p className='text-small-regular text-align-2 text-center mt-2'>Already have an account?
        <Link to='/login' className='text-primary-500 text-small-semibold ml-1'>Log In</Link></p>
      </form>
              </div>

    </Form>

  )
}

export default Register