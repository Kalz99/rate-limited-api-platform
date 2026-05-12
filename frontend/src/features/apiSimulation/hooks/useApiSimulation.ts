import { useState } from 'react';
import { ApiType } from '../components/ApiTabs';

export const useApiSimulation = () => {
    const [selectedApi, setSelectedApi] = useState<ApiType>('email');
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

    const handleRunSimulation = () => {
        const currentValue = inputs[selectedApi as keyof typeof inputs];
        console.log(`Running simulation for: ${selectedApi}`);
        console.log(`Endpoint: /api/${selectedApi === 'email' ? 'email/validate' : selectedApi === 'password' ? 'password/check' : 'ip/info'}`);
        console.log(`Payload:`, { [selectedApi]: currentValue });
        
        // This will be expanded later with actual API calls
        return {
            api: selectedApi,
            value: currentValue,
            timestamp: new Date().toISOString()
        };
    };

    return {
        selectedApi,
        setSelectedApi,
        inputs,
        handleInputChange,
        handleRunSimulation
    };
};
