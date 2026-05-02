class ApiService {

    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const isValid = regex.test(email);

        return {
            email,
            valid: isValid,
            domain: isValid ? email.split('@')[1] : null
        };
    }

    checkPassword(password) {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = ["weak", "medium", "strong", "very strong"];

        return {
            strength: levels[score - 1] || "very weak",
            score
        };
    }

    getIPInfo(ip) {
        // mock data (you can replace later)
        return {
            ip,
            country: "Unknown",
            city: "Unknown"
        };
    }
}

module.exports = new ApiService();