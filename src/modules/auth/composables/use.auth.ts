import { computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { login as loginService } from '@/modules/auth/services/auth.service';
import type { LoginCredentials } from '../interfaces/auth.interface';
import { useRouter } from 'vue-router';
import type { LoggedUser } from '../interfaces/user.interface';

const login = async (user: LoginCredentials) => {
    const response = await loginService(user);
    return response;
};

export const useAuth = () => {
    const authStore = useAuthStore();
    const router = useRouter();

    const isAuthenticated = computed(() => authStore.getAuthStatus() === "Authenticated");

    const authMutation = useMutation<LoggedUser, Error, LoginCredentials>({
        mutationFn: login,
        onSuccess: (response) => {
            if (response) {
                authStore.login(response);
            }
        }
    });

    const logout = () => {
        authStore.logout();
        router.push({ name: 'Login' });
    };

    const checkAuthStatus = async () => {
        await authStore.checkAuthStatus();
    };

    return {
        //authMutation,
        login: authMutation.mutateAsync,  // Usamos mutateAsync para esperar la mutación
        logout,
        checkAuthStatus,    
        isLoading: computed(() => authMutation.isPending),
        isSuccess: computed(() => authMutation.isSuccess),
        isError: computed(() => authMutation.isError),
        isAuthenticated,
    };
};