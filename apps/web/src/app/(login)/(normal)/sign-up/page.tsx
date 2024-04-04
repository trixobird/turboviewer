'use client';

import React, { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
// eslint-disable-next-line import/named -- not sure why this is being flagged
import { useFormState } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { type z } from 'zod';
import Link from 'next/link';
import { SignUpSchema } from '@/util/schemas/login-schemas';
import { signUp } from '@/app/(login)/actions';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';

export default function Page(): JSX.Element {
  const [state] = useFormState(signUp, {
    message: '',
  });
  const form = useForm<z.output<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      ...(state.fields ?? {}),
    },
  });

  return (
    <div>
      <div className="text-destructive" />
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl text-center">Sign up</h1>
        <Form {...form} formName="signUp" onSubmitAction={signUp}>
          <div className="flex gap-2">
            <FormField
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your first name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Your last name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign up</Button>
        </Form>
        <Link className="text-center underline" href="/sign-in">
          Already have an account? Log in.
        </Link>
      </div>
    </div>
  );
}
