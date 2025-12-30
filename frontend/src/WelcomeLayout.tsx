import { useEffect } from "react";
import type { WelcomeLayoutProps } from "./components/interface/WelcomeLayoutProps";

export const WelcomeLayout = ({ title = "Welcome to PixelPursuit", children }: WelcomeLayoutProps) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            {children}
        </>
    );
}