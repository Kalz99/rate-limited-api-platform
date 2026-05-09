export interface Parameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

export interface StatusCode {
    code: number;
    description: string;
}

export interface EndpointCardProps {
    name: string;
    description: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    parameters?: Parameter[];
    headers?: Record<string, string>;
    exampleResponse?: any;
    statusCodes?: StatusCode[];
}
