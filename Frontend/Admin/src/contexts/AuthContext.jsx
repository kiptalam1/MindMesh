import { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// check if token is expired;
	function isTokenExpired(token) {
		try {
			const { exp } = jwtDecode(token);
			return Date.now() >= exp * 1000;
		} catch {
			return true;
		}
	}
	// auto-login from localstorage on reload;
	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		if (storedToken && !isTokenExpired(storedToken)) {
			const decodedUser = jwtDecode(storedToken);
			setToken(storedToken);
			setIsAuthenticated(true);
			setUser(decodedUser);
		} else {
			logout();
		}
	}, []);

	const login = (jwt) => {
		setToken(jwt);
		localStorage.setItem("token", jwt);
		setIsAuthenticated(true);

		try {
			const decodedUser = jwtDecode(jwt);
			setUser(decodedUser);
		} catch {
			setUser(null);
		}
	};
	const logout = () => {
		setToken(null);
		localStorage.removeItem("token");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ token, user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}
