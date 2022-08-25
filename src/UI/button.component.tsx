import './button.style.scss';
import { CSSProperties } from 'react';

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
};

const Button = ({ children, className, style, onClick }: ButtonProps) => {
    return (
        <button className={`all-button ${className}`} onClick={onClick} style={style}>
            {children}
        </button>
    );
};

export default Button;
