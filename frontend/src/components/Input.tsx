import { Label } from './Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className="flex flex-col mb-4 w-full">
            {label && <Label>{label}</Label>}
            <input 
                className={`
                    w-full px-4 py-2 text-sm bg-slate-950/50 border border-slate-800 rounded-xl shadow-inner
                    text-white placeholder:text-slate-600
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                    transition-all duration-200 backdrop-blur-sm
                    ${props.className || ''}
                `}
                {...props} 
            />
        </div>
    );
};
