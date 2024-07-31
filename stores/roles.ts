import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { Role } from "~/api/roles";

export const useRoleStore = defineStore('roles', () => {
  const rolesByCurrentUser = ref<Role[]>([]);
  const role = ref<Role | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getRolesByUserUuid(uuid: string) {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.getRoleByUserUuid(uuid);
      return data;
    } catch (err) {
      error.value = 'Failed to fetch role by user UUID';
      console.error('Error fetching role by user UUID', err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchRolesForCurrentUser() {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.getRolesForCurrentUser();
      rolesByCurrentUser.value = data;
    } catch (err) {
      error.value = 'Failed to fetch roles for current user';
      console.error('Error fetching roles for current user', err);
    } finally {
      loading.value = false;
    }
  }

  return {
    role,
    rolesByCurrentUser,
    loading,
    error,
    getRolesByUserUuid,
    fetchRolesForCurrentUser
  };
}, {
  persist: true
});
