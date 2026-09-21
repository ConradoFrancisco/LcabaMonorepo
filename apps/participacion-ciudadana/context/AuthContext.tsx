"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

// ── Tipos ─────────────────────────────────────────────────────────────────────

export type AuthUser = {
    sub: string;
    dn?: string;
    name?: string;
    surname?: string;
    email?: string;
    groups?: string[];
    id_user?: number;
    username?: string;
    role?: string;
    tipo?: "lcaba" | "ext";
    dni?: string;
};

type LoginResult =
    | { ok: true; user: AuthUser }
    | { ok: false; message: string };

export type RegisterResult =
    | { ok: true; message: string; user?: AuthUser }
    | { ok: false; message: string };

type AuthContextValue = {
    user: AuthUser | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<LoginResult>;
    loginExt: (email: string, password: string) => Promise<LoginResult>;
    registerExt: (data: Record<string, any>) => Promise<RegisterResult>;
    activateExt: (token: string) => Promise<{ ok: boolean; message: string }>;
    getProfile: () => Promise<{ ok: boolean; member?: any; message?: string }>;
    updateProfile: (data: Record<string, any>) => Promise<{ ok: boolean; message: string; member?: any }>;
    changePassword: (actualPassword: string, newPassword: string) => Promise<{ ok: boolean; message: string }>;
    logout: () => void;
};

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "lcaba_auth_token";
const USER_KEY  = "lcaba_auth_user";
const API_BASE  = process.env.NEXT_PUBLIC_API ?? "";

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken]     = useState<string | null>(null);
    const [user, setUser]       = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Rehidratar desde localStorage al montar
    useEffect(() => {
        try {
            const storedToken = localStorage.getItem(TOKEN_KEY);
            const storedUser  = localStorage.getItem(USER_KEY);
            if (storedToken && storedUser) {
                // Verificar que el token no expiró (simple check del exp en payload)
                const payload = JSON.parse(atob(storedToken.split(".")[1]));
                if (payload.exp && payload.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                } else {
                    // Token expirado — limpiar
                    localStorage.removeItem(TOKEN_KEY);
                    localStorage.removeItem(USER_KEY);
                }
            }
        } catch {
            // Silenciosamente ignorar errores de parse
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback(
        async (username: string, password: string): Promise<LoginResult> => {
            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });

                const data = await res.json();

                if (!data.ok || !data.token) {
                    return { ok: false, message: data.message ?? "Usuario o contraseña incorrectos" };
                }

                // Persistir
                localStorage.setItem(TOKEN_KEY, data.token);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));

                const authUser = data.user as AuthUser;
                setToken(data.token);
                setUser(authUser);

                return { ok: true, user: authUser };
            } catch {
                return { ok: false, message: "Error de conexión. Intentá de nuevo." };
            }
        },
        []
    );

    const loginExt = useCallback(
        async (email: string, password: string): Promise<LoginResult> => {
            const url = `${API_BASE}/auth/ext/login`;
            console.log("[AUTH_CONTEXT] loginExt llamando a:", url, { email });
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                console.log("[AUTH_CONTEXT] loginExt HTTP status:", res.status);
                const data = await res.json();
                console.log("[AUTH_CONTEXT] loginExt response data:", data);

                if (!data.ok || !data.token) {
                    return { ok: false, message: data.message ?? "Usuario o contraseña incorrectos" };
                }

                // Persistir
                localStorage.setItem(TOKEN_KEY, data.token);
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));

                const authUser = data.user as AuthUser;
                setToken(data.token);
                setUser(authUser);

                return { ok: true, user: authUser };
            } catch (err) {
                console.error("[AUTH_CONTEXT] loginExt fetch error:", err);
                return { ok: false, message: "Error de conexión. Intentá de nuevo." };
            }
        },
        []
    );

    const registerExt = useCallback(
        async (formData: Record<string, any>): Promise<RegisterResult> => {
            try {
                const res = await fetch(`${API_BASE}/auth/ext/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (!data.ok) {
                    return { ok: false, message: data.message ?? "Error al registrar usuario" };
                }

                // Si por alguna razón devolviera token (por ejemplo auto-login en el futuro)
                if (data.token && data.user) {
                    localStorage.setItem(TOKEN_KEY, data.token);
                    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
                    const authUser = data.user as AuthUser;
                    setToken(data.token);
                    setUser(authUser);
                    return { ok: true, message: data.message, user: authUser };
                }

                return { ok: true, message: data.message };
            } catch {
                return { ok: false, message: "Error de conexión. Intentá de nuevo." };
            }
        },
        []
    );

    const activateExt = useCallback(
        async (token: string): Promise<{ ok: boolean; message: string }> => {
            try {
                const res = await fetch(`${API_BASE}/auth/ext/activate?token=${encodeURIComponent(token)}`, {
                    method: "GET",
                });
                const data = await res.json();
                return {
                    ok: !!data.ok,
                    message: data.message || (data.ok ? "Cuenta activada con éxito." : "Error al activar la cuenta."),
                };
            } catch {
                return { ok: false, message: "Error de conexión al activar la cuenta." };
            }
        },
        []
    );

    const getProfile = useCallback(async (): Promise<{ ok: boolean; member?: any; message?: string }> => {
        try {
            const currentToken = token || localStorage.getItem(TOKEN_KEY);
            if (!currentToken) return { ok: false, message: "No autenticado" };

            const res = await fetch(`${API_BASE}/auth/me`, {
                headers: { Authorization: `Bearer ${currentToken}` },
            });
            const data = await res.json();
            if (data.ok && data.member) {
                return { ok: true, member: data.member };
            }
            return { ok: false, message: data.message || "No se pudieron obtener los datos" };
        } catch {
            return { ok: false, message: "Error al consultar perfil" };
        }
    }, [token]);

    const updateProfile = useCallback(
        async (profileData: Record<string, any>): Promise<{ ok: boolean; message: string; member?: any }> => {
            try {
                const currentToken = token || localStorage.getItem(TOKEN_KEY);
                if (!currentToken) return { ok: false, message: "No autenticado" };

                const res = await fetch(`${API_BASE}/auth/ext/profile`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentToken}`,
                    },
                    body: JSON.stringify(profileData),
                });
                const data = await res.json();
                return {
                    ok: !!data.ok,
                    message: data.message || (data.ok ? "Perfil actualizado" : "Error al actualizar"),
                    member: data.member,
                };
            } catch {
                return { ok: false, message: "Error de conexión al actualizar perfil" };
            }
        },
        [token]
    );

    const changePassword = useCallback(
        async (actualPassword: string, newPassword: string): Promise<{ ok: boolean; message: string }> => {
            try {
                const currentToken = token || localStorage.getItem(TOKEN_KEY);
                if (!currentToken) return { ok: false, message: "No autenticado" };

                const res = await fetch(`${API_BASE}/auth/ext/change-password`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${currentToken}`,
                    },
                    body: JSON.stringify({ actualPassword, newPassword }),
                });
                const data = await res.json();
                return {
                    ok: !!data.ok,
                    message: data.message || (data.ok ? "Contraseña cambiada" : "Error al cambiar contraseña"),
                };
            } catch {
                return { ok: false, message: "Error de conexión al cambiar la contraseña" };
            }
        },
        [token]
    );

    const logout = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                isAuthenticated: !!token && !!user,
                login,
                loginExt,
                registerExt,
                activateExt,
                getProfile,
                updateProfile,
                changePassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    }
    return ctx;
}
