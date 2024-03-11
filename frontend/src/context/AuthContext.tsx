import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { loginUser, checkAuthSatus } from "../helpers/api-communicator.ts";

type User = {
    name: string;
    email: string;
};
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in, fetch if the user's cookie are valid then skip login
        async function checkStatus() {
            const data = await checkAuthSatus();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };
    const signup = async (name: string, email: string, password: string) => {};
    const logout = async () => {};

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
