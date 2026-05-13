import RegisterForm from "../components/RegisterForm";

export const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden px-4 py-20">
            {/* Vibrant glowing accents */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[140px]"></div>

            <div className="max-w-md w-full space-y-10 p-8 md:p-12 bg-slate-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-slate-800 relative z-10">
                <div className="text-center space-y-3">
                    <h2 className="text-3xl font-black text-white tracking-tighter">Register</h2>
                    <p className="text-sm text-slate-400 font-medium tracking-tight italic">Create your account to get started.</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
};