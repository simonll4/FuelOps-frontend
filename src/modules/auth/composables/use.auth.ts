import { computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { login as loginService } from '@/modules/auth/services/auth.service';
import { useRouter } from 'vue-router';
import type { LoginCredentials } from '@/modules/auth/interfaces/auth.interface';
import type { LoggedUser } from '@/modules/auth/interfaces/user.interface';

// Servicio de login
const login = async (user: LoginCredentials): Promise<LoggedUser> => {
    const response = await loginService(user);
    return response;
};

export const useAuth = () => {
    const authStore = useAuthStore();
    const router = useRouter();

    // Computado para verificar si el usuario está autenticado
    const isAuthenticated = computed(() => authStore.getAuthStatus() === "Authenticated");

    // Mutation para el login usando Vue Query
    const authMutation = useMutation<LoggedUser, Error, LoginCredentials>({
        mutationFn: login,
        onSuccess: (response) => {
            if (response) {
                authStore.login(response);  // Guardar en el store si la autenticación es exitosa
            }
        }
    });

    // Logout
    const logout = () => {
        authStore.logout();
        router.push({ name: 'Login' });
    };

    // Verificación de estado de autenticación
    const checkAuthStatus = async () => {
        await authStore.checkAuthStatus();
    };

    return {
        login: authMutation.mutateAsync,  // Usamos mutateAsync para esperar la mutación
        logout,
        checkAuthStatus,
        isLoading: computed(() => authMutation.isPending),
        isSuccess: computed(() => authMutation.isSuccess),
        isError: computed(() => authMutation.isError),
        isAuthenticated,
    };
};