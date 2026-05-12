import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, className = '', ...props }) => {
    return (
        <label 
            className={`text-sm font-semibold text-slate-300 ml-1 mb-3 block text-left ${className}`} 
            {...props}
        >
            {children}
        </label>
    );
};
