import { watch } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/stores/users.store';
import { UserService } from '@/services/user.service';

export const useUsers = () => {
  const store = useUsersStore();
  const { users, internalUsers, externalUsers, selectedUser } = storeToRefs(store);
  const queryClient = useQueryClient();

  console.log('Composable useUsers inicializado');

  // Fetch users
  const { isLoading, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: UserService.fetchAll,
    staleTime: Infinity,
  });

  watch(data, (result) => {
    console.log('Watch activado - Resultado:', result);
    if (result) {
      console.log('Intentando actualizar store con:', result);
      store.setUsers([...result.internal, ...result.external]);
      console.log('Store actualizado - Usuarios:', store.users);
    } else {
      console.warn('Resultado inválido, skip de actualización');
    }
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: UserService.create,
    onSuccess: (newUser) => {
      store.addUser(newUser);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: UserService.update,
    onSuccess: (updatedUser) => {
      store.updateUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: UserService.delete,
    onSuccess: (_, userId) => {
      store.deleteUser(userId as number);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    // Estado
    users,
    internalUsers,
    externalUsers,
    selectedUser,
    isLoading,
    error,

    // Métodos
    setSelectedUser: store.setSelectedUser,
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
};