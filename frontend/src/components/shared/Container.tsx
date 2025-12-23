import type { ContainerProps } from "../interface/ContainerProps"

export const Container = ({ children, className = " " }: ContainerProps) => {
    return <div className={`lg:px-40 px-5  ${className}`}>
        {children} 
    </div>
};