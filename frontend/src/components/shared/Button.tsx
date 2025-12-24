import type { ButtonProps } from "../interface/ButtonProps"


export const Button = ({ className, children, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`px-6 py-3 rounded-full outline-none cursor-pointer
        relative overflow-hidden border dark:bg-blue-800 bg-blue-600 ${className}`}>
            {children}
        </button>
    )
}

