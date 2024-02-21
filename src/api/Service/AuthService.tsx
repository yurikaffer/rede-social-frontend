import IdTokenVerifier from 'idtoken-verifier';
import { api } from '../apiConfig';

class AuthService {
    private readonly verifier: IdTokenVerifier;
 
    constructor() {
        this.verifier = new IdTokenVerifier({
            issuer: process.env.REACT_APP_ISSUER!,
            audience: process.env.REACT_APP_AUDIENCE!,
        });
    }

    private saveToLocalStorage(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    private removeFromLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }

    private getTokenFromResponse(response: any): string | null {
        return response.status === 201 ? response.data.access_token : null;
    }

    private decodeToken(token: string): {payload: any} | null {
        try {
            return this.verifier.decode(token);
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    }

    async authenticate(userName: string, password: string): Promise<boolean> {
        try {
            const response = await api.post('auth/login', { userName, password });
            const token = this.getTokenFromResponse(response);

            if (token) {
                this.saveTokenAndUserId(token);
                return true;
            } else {
                console.error('Erro de autenticação');
                return false;
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return false;
        }
    }

    async saveTokenAndUserId(token: string): Promise<void> {
        const decodedToken = this.decodeToken(token);

        this.saveToLocalStorage('accessToken', token);
        this.saveToLocalStorage( 'userId', decodedToken?.payload.sub || '');
    }

    logout(): void {
        this.removeFromLocalStorage('accessToken');
        this.removeFromLocalStorage('userId');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('accessToken');
    }
}

const authService = new AuthService()
export default authService;
