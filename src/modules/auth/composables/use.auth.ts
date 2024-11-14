import { computed } from 'vue';
import router from '@/router';
import { useMutation } from '@tanstack/vue-query';

import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { login as loginService } from '@/modules/auth/services/auth.service';
import type { User } from '../interfaces/user.interface';

const login = async (user: User) => {
    const token = await loginService(user);
    return token;
};

export const useAuth = () => {
    const authStore = useAuthStore();

    const authMutation = useMutation<{ token: string }, Error, User>({
        mutationFn: login,
        onSuccess: (data) => {
            if (data) {
                authStore.login(String(data));
            }
        }
    });

    const logout = () => {
        authStore.logout();
        router.push({ name: 'login' });
    };


    return {
        authMutation,
        login: authMutation.mutateAsync,  // Usamos mutateAsync para esperar la mutación
        logout,
        isLoading: computed(() => authMutation.isPending),
        isSuccess: computed(() => authMutation.isSuccess),
        isError: computed(() => authMutation.isError),
    };
};




// import { useMutation } from '@tanstack/vue-query';
// import { useAuthStore } from '@/auth/stores/auth.store';
// import { login as loginService } from '@/auth/services/auth.service';
// import type { User } from '../interfaces/user.interface';
// import { computed, watch } from 'vue';


// const login = async (user: User) => {
//     const token = await loginService(user);
//     return token;  // Retorna el token
// };

// export const useAuth = () => {
//     const authStore = useAuthStore();

//     const authMutation = useMutation<{ token: string }, Error, User>({
//         mutationFn: login
//     });


//     // Usamos un watch para detectar cuando la mutación se ha completado con éxito
//     watch(() => authMutation.isSuccess, (newVal) => {
//         if (newVal) {
//             console.log('Mutation success', authMutation.data);
//             const token = authMutation.data;
//             if (token) {
//                 authStore.login(String(token));
//             }
//         }
//     });

//     // Función para realizar logout
//     const logout = () => {
//         authStore.logout();  // Llama a la acción del store para eliminar el token
//     };

//     return {
//         authMutation,
//         login: authMutation.mutate,
//         logout,
//         isLoading: computed(() => authMutation.isPending),
//         isSuccess: computed(() => authMutation.isSuccess),
//         isError: computed(() => authMutation.isError),
//     };
// };
