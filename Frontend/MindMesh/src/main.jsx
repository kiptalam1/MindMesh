import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import App from "./App.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StrictMode>
			<AuthProvider>
				<App />
			</AuthProvider>
		</StrictMode>
	</BrowserRouter>
);
