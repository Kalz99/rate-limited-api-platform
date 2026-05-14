import { useState } from 'react';
import { ApiType } from '../types';
import { validateEmail, checkPassword, checkIP } from '../api/simulation';

export const useApiSimulation = () => {
    const [selectedApi, setSelectedApi] = useState<ApiType>('email');
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        ip: ''
    });

    const handleInputChange = (field: keyof typeof inputs, value: string) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRunSimulation = async () => {
        const currentValue = inputs[selectedApi as keyof typeof inputs];
        setIsLoading(true);
        setResponse(null);

        try {
            let res;
            if (selectedApi === 'email') {
                res = await validateEmail(inputs.email);
            } else if (selectedApi === 'password') {
                res = await checkPassword(inputs.password);
            } else {
                res = await checkIP(inputs.ip);
            }
            setResponse(res.data);
        } catch (error: any) {
            setResponse(error.response?.data || { error: 'An unexpected error occurred' });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        selectedApi,
        setSelectedApi,
        inputs,
        handleInputChange,
        response,
        isLoading,
        handleRunSimulation
    };
};
