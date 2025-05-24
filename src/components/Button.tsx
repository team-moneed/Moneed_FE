'use client';

type Props = {
    theme: 'primary' | 'secondary' | 'ghost' | 'brand';
    children: React.ReactNode;
    textcolor: 'primary' | 'secondary' | 'ghost' | 'brand';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
};

const Button = ({ type = 'button', theme, textcolor, children, className, onClick, disabled = false }: Props) => {
    const buttonTheme = {
        primary: '--moneed-black',
        secondary: '--moneed-white',
        ghost: '--moneed-white',
        brand: '--moneed-brand-color',
    };

    const textTheme = {
        primary: '--moneed-white',
        secondary: '--moneed-gray-9',
        ghost: '--moneed-gray-7',
        brand: '--moneed-black',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `bg-(${buttonTheme[theme]}) text-(${textTheme[textcolor]}) rounded-[1.6rem] ${disabled ? 'pointer-events-none cursor-not-allowed bg-(--moneed-gray-4) text-(--moneed-gray-6)' : ''} ` +
                className
            }
        >
            {children}
        </button>
    );
};
export default Button;
