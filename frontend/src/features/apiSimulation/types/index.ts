import React from 'react';

export type ApiType = 'email' | 'password' | 'ip';

export interface ApiOption {
    id: ApiType;
    label: string;
    icon: React.ReactNode;
    path?: string;
}

export interface ApiTabsProps {
    options: ApiOption[];
    selected: ApiType;
    onSelect: (id: ApiType) => void;
}

export interface ResponseConsoleProps {
    status?: string;
    isActive?: boolean;
    response?: any;
    isLoading?: boolean;
    children?: React.ReactNode;
}
