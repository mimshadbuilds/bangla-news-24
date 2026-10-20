'use client';

import { Bookmark, Clock, FloppyDisk, Pencil, Xmark } from '@gravity-ui/icons';
import {
    Avatar,
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from '@heroui/react';
import Link from 'next/link';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData: Record<string, string> = {};

        formData.forEach((value, key) => {
            userData[key] = value.toString();
        });

        const imageUrl = formData.get('image') as string;
        const { error } = await authClient.updateUser({
            image: imageUrl,
            name: userData.name,
        });

        if (error) {
            toast.danger(error.message);
            return;
        }

        toast.success('Profile updated successfully!');
        setIsEditing(false);
    };

    return (
        <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
            <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 sm:p-6">
                {!isEditing ? (
                    <>
                        <div className="flex flex-col items-center">
                            <Avatar size="lg">
                                <Avatar.Image
                                    alt={user?.name ?? 'User'}
                                    src={user?.image ?? undefined}
                                />
                                <Avatar.Fallback>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM4.5 21a7.5 7.5 0 0 1 15 0H4.5Z" clipRule="evenodd" />
                                    </svg>
                                </Avatar.Fallback>
                            </Avatar>
                            <h2 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                {user?.name}
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                {user?.email}
                            </p>
                        </div>

                        <div className="mt-6 space-y-4 border-t border-neutral-200 pt-5 dark:border-neutral-700">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                    Name
                                </p>
                                <p className="mt-1 break-words text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                    {user?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                    Email
                                </p>
                                <p className="mt-1 break-words text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                    {user?.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                                    Created At
                                </p>
                                <p className="mt-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                    {user?.createdAt?.toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Button
                                type="button"
                                onPress={() => setIsEditing(true)}
                                className="bg-red-700 text-white">
                                <Pencil />
                                Edit Profile
                            </Button>
                        </div>

                        <div className="mt-6 grid gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-700 sm:grid-cols-2">
                            <Link
                                href="/bookmarks"
                                className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-red-700 hover:text-red-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400">
                                <Bookmark className="size-4" />
                                সংরক্ষিত সংবাদ
                            </Link>
                            <Link
                                href="/history"
                                className="flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-red-700 hover:text-red-700 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-red-400 dark:hover:text-red-400">
                                <Clock className="size-4" />
                                পড়ার ইতিহাস
                            </Link>
                        </div>
                    </>
                ) : (
                    <Form className="w-full" onSubmit={handleUpdateProfile}>
                        <Fieldset>
                            <Fieldset.Legend className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                Profile Settings
                            </Fieldset.Legend>
                            <Description className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                Update your profile information.
                            </Description>

                            <FieldGroup className="mt-3 gap-5">
                                <TextField
                                    isRequired
                                    name="name"
                                    validate={(value) => {
                                        if (value.length < 3) {
                                            return 'Name must be at least 3 characters';
                                        }
                                        return null;
                                    }}>
                                    <Label>Name</Label>
                                    <Input
                                        className="text-neutral-900"
                                        defaultValue={user?.name ?? ''}
                                        placeholder="Enter your name"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField
                                    name="email"
                                    type="email"
                                    validate={(value) => {
                                        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                            return 'Please enter a valid email address';
                                        }
                                        return null;
                                    }}>
                                    <Label>Email</Label>
                                    <Input
                                        className="text-neutral-900"
                                        defaultValue={user?.email ?? ''}
                                        placeholder="Enter your email"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField name="image">
                                    <Label>Profile Image URL</Label>
                                    <Input
                                        className="text-neutral-900 focus:ring-red-700"
                                        defaultValue={user?.image ?? ''}
                                        placeholder="Enter an image URL"
                                    />
                                    <FieldError />
                                </TextField>
                            </FieldGroup>

                            <Fieldset.Actions className="mt-3 flex flex-col justify-center gap-3 sm:flex-row">
                                <Button type="submit" className="bg-red-700 text-white">
                                    <FloppyDisk />
                                    Save changes
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onPress={() => setIsEditing(false)}>
                                    <Xmark />
                                    Cancel
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                )}
            </section>
        </main>
    );
};

export default ProfilePage;
