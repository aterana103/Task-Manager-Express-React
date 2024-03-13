/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const logout = async () => {
        try {
            Cookies.remove('token');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookie = Cookies.get('token');
            if (!cookie) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const verify = await verifyTokenRequest(cookie);
                if (!verify) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return
                } 
                setIsAuthenticated(true);
                setUser(verify.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            loading,
            signup,
            signin,
            logout,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}