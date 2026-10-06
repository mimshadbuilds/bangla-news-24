"use client";

import { Toast } from "@heroui/react";
import { ReactNode } from "react";

export default function ToastProvider({ children }: { children: ReactNode }) {
    return (
        <>
        {children}
        <Toast.Provider placement="top" />
        </>
    );
}