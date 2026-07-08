import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AUTH_TOKEN_KEY = "authToken";
const USER_NAME_KEY = "userName";
const USER_EMAIL_KEY = "userEmail";

export function AuthProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState({ name: "", email: "" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const name = localStorage.getItem(USER_NAME_KEY) || "";
        const email = localStorage.getItem(USER_EMAIL_KEY) || "";

        if (token) {
            setAuthToken(token);
            setUser({ name, email });
        }

        setIsLoading(false);
    }, []);

    const login = useCallback((token, userData = {}) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);

        if (userData.email) {
            localStorage.setItem(USER_EMAIL_KEY, userData.email);
        }

        if (userData.name) {
            localStorage.setItem(USER_NAME_KEY, userData.name);
        }

        setAuthToken(token);
        setUser({
            name: userData.name || "",
            email: userData.email || "",
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_NAME_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
        setAuthToken(null);
        setUser({ name: "", email: "" });
    }, []);

    const value = {
        authToken,
        user,
        isLoggedIn: !!authToken,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
