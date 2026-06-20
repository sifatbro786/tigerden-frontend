import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./router/AppRoutes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router>
                    <div className="App">
                        <AppRoutes />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                success: {
                                    style: {
                                        background: "#4ade80",
                                        color: "black",
                                    },
                                },
                                error: {
                                    style: {
                                        background: "#f87171",
                                        color: "white",
                                    },
                                },
                            }}
                        />
                    </div>
                </Router>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
