import type { PharagraphProps } from "../interface/PharagraphProps"

export const Pharagraph = ({ children, className = " " }: PharagraphProps) => {
    return <p className={`text-heading-3 md:text-lg ${className}`}>
        {children}
    </p>
};