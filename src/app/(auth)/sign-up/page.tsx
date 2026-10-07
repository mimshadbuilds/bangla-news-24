'use client';

import { signUp } from "@/lib/auth-client";
import { Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";


const SignUpPage = () => {
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const resData: Record<string, string> = {};
            formData.forEach((value, key) => {
            resData[key] = value.toString();
    });

        const { data, error} = await signUp.email({
            name: resData.name as string,
            email: resData.email as string,
            password: resData.password as string,
            image: resData.image as string,
        })
        // console.log('sign up data', data);
        if(data) {
            toast.success("সাইন আপ সফল হয়েছে! একাউন্ট ভেরিফাই করতে আপনার ইমেইল চেক করুন।");
            redirect('/sign-in');
        }
        
        if(error) {
            toast.danger("সাইন আপ অসফল! এই ইমেইলে ইতিমদ্ধে ইউজার আছে, নতুন ইমেইল দিয়ে চেস্টা করুন।" )
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 py-4">
            <h1 className="mb-5 ml-7 text-center text-2xl font-bold text-red-700">সাইন আপ</h1>
                <Form className="mx-auto flex max-w-md flex-col gap-4 md:pl-20"
                onSubmit={handleSignUp}>
                <TextField className="flex flex-col gap-1"
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}>
                    <Label>নাম</Label>
                    <Input placeholder="Your name" className="focus-within:ring-red-500"  />
                    <FieldError />
                </TextField>
                <TextField className="flex flex-col gap-1"
                    name="image" 
                    type="url">
                    <Label>ইমেজ</Label>
                    <Input placeholder="ImageURL" className="focus-within:ring-red-500"  />
                    <FieldError />
                </TextField>

                <TextField
                    className="flex flex-col gap-1"
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value
                            )
                        ) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}>
                    <Label>ইমেইল</Label>
                    <Input className="focus-within:ring-red-500" placeholder="Enter email address" />
                    <FieldError />
                </TextField>

                <TextField
                    className="flex flex-col gap-1"
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
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
                    <Input className="focus-within:ring-red-500" placeholder="Enter your password" />
                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1 number
                    </Description>
                    <FieldError />
                </TextField>
                <div className="flex justify-center gap-3">
                    <button type="submit" 
                        className="min-w-24 rounded bg-red-700 px-3 py-2 text-white text-sm font-semibold text-white hover:bg-red-800">
                        সাইন আপ করুন
                    </button>
                    {/* <Button type="reset" variant="secondary"
                        className="min-w-24">
                        Reset
                    </Button> */}
                </div>
                <p className="mt-2 text-center text-sm text-neutral-600">অ্যাকাউন্ট আছে? <Link className="font-semibold text-red-700 hover:underline" href='/sign-in'>সাইন ইন করুন</Link> </p>
            </Form>
        </div>
    );
};

export default SignUpPage;