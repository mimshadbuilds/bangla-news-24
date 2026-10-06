'use client';

import { signIn } from '@/lib/auth-client';
import {Button, Description, FieldError, Form, InputGroup, Label, TextField, toast} from "@heroui/react";
import React, { useState } from 'react';
import {Eye, EyeSlash} from "@gravity-ui/icons";
import Link from 'next/link';

const SignInPage = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const resData: Record<string, string> = {};
        formData.forEach((value, key) => {
            resData[key] = value.toString();
        });

        const {data, error} = await signIn.email({
            email: resData.email as string,
            password: resData.password as string,
            rememberMe: true,
            callbackURL: '/'
        });

        if (error) {
            toast.danger(error.message);
            return;
        }
        toast.success("সাইন ইন সফল হয়েছে!");
    }
    return (
        <div className='flex items-center flex-col justify-center my-20'>
            <h1 className="mb-4 text-center text-2xl font-bold text-red-700">সাইন ইন</h1>
            <Form className="flex max-w-md flex-col gap-4"
            render={(props) => <form {...props} data-custom="foo" />}
            onSubmit={handleSignIn}>
            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                    if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                        return "Please enter a valid email address";
                    }
                    return null;
                }}>
                <Label>ইমেল</Label>
                <InputGroup fullWidth>
                    <InputGroup.Input className="focus-within:ring-red-500" placeholder="Your email" />
                </InputGroup>
                <FieldError />
            </TextField>
            <TextField
                isRequired
                name="password"
                minLength={8}
                validate={(value) => {
                    if (value.length < 8) {
                        return "Password must be at least 8 characters";
                    }
                    if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                    }
                    if (!/[0-9]/.test(value)) {
                        return "Password must contain at least one number";
                    }
                    return null;
                }}>
                <Label>পাসওয়ার্ড</Label>
                <InputGroup fullWidth>
                    <InputGroup.Input
                        name="password"
                        type={isVisible ? "text" : "password"}
                        className="focus-within:ring-red-500"
                        placeholder="Enter your password"
                    />
                    <InputGroup.Suffix>
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            aria-label={isVisible ? "Hide password" : "Show password"}>
                            {isVisible ? <Eye className="size-5" /> : <EyeSlash className="size-5" />}
                        </button>
                    </InputGroup.Suffix>
                </InputGroup>
                <Description>
                    Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError />
            </TextField>
            <div className="flex justify-center items-center gap-2">
                <button type="submit" className="min-w-24 rounded bg-red-700 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800">
                সাইন ইন করুন
                </button>
                {/* <Button type="reset" variant="secondary">
                Reset
                </Button> */}
            </div>
            <p className='text-center'><small>পাসওয়ার্ড ভুলে গেছেন? <Link href="/forgot-password" 
            className="text-red-700 hover:underline">এখানে যান</Link></small></p>
            </Form>
        </div>
    );
};

export default SignInPage;