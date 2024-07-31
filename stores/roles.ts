import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { Role, Applicant, UpdateApplicantPayload } from "~/api/roles";

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

  async function searchApplicantByFullName(query: string): Promise<Role[]> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.searchApplicantByFullName(query);
      return data;
    } catch (err) {
      error.value = 'Failed to search applicants by full name';
      console.error('Error searching applicants by full name', err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  async function getApplicantByUuid(uuid: string): Promise<Applicant> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.getApplicantByUuid(uuid);
      return data;
    } catch (err) {
      error.value = 'Failed to get applicant by UUID';
      console.error('Error getting applicant by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function updateApplicantByUuid(uuid: string, payload: UpdateApplicantPayload): Promise<Applicant> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.updateApplicantByUuid(uuid, payload);
      return data;
    } catch (err) {
      error.value = 'Failed to update applicant by UUID';
      console.error('Error updating applicant by UUID', err);
      return null;
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
    fetchRolesForCurrentUser,
    searchApplicantByFullName,
    getApplicantByUuid,
    updateApplicantByUuid
  };
}, {
  persist: true
});
