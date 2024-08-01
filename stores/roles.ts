import { defineStore } from "pinia";
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { Role, Applicant, UpdateApplicantPayload, Individual, UpdateIndividualPayload, LegalEntity, UpdateLegalEntityPayload, Moderator, UpdateModeratorPayload, ChangeUserRolePayload, UserRoleResponse      } from "~/api/roles";

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

  async function getIndividualByUuid(uuid: string): Promise<Individual> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.getIndividualByUuid(uuid);
      return data;
    } catch (err) {
      error.value = 'Failed to get individual by UUID';
      console.error('Error getting individual by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function updateIndividualByUuid(uuid: string, payload: UpdateIndividualPayload): Promise<Individual> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.updateIndividualByUuid(uuid, payload);
      return data;
    } catch (err) {
      error.value = 'Failed to update individual by UUID';
      console.error('Error updating individual by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }


  async function getLegalEntityByUuid(uuid: string): Promise<LegalEntity> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.getLegalEntityByUuid(uuid);
      return data;
    } catch (err) {
      error.value = 'Failed to get legal entity by UUID';
      console.error('Error getting legal entity by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function updateLegalEntityByUuid(uuid: string, payload: UpdateLegalEntityPayload): Promise<LegalEntity> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.updateLegalEntityByUuid(uuid, payload);
      return data;
    } catch (err) {
      error.value = 'Failed to update legal entity by UUID';
      console.error('Error updating legal entity by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function getModeratorByUuid(uuid: string): Promise<Moderator> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.getModeratorByUuid(uuid);
      return data;
    } catch (err) {
      error.value = 'Failed to get moderator by UUID';
      console.error('Error getting moderator by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function updateModeratorByUuid(uuid: string, payload: UpdateModeratorPayload): Promise<Moderator> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.updateModeratorByUuid(uuid, payload);
      return data;
    } catch (err) {
      error.value = 'Failed to update moderator by UUID';
      console.error('Error updating moderator by UUID', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function changeCurrentUserRole(payload: ChangeUserRolePayload): Promise<UserRoleResponse> {
    loading.value = true;
    error.value = null;
    try {
      const api = useApi();
      const data = await api.roles.changeCurrentUserRole(payload);
      await fetchRolesForCurrentUser();
      return data;
    } catch (err) {
      error.value = 'Failed to change user role';
      console.error('Error changing user role', err);
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
    updateApplicantByUuid,
    getIndividualByUuid,
    updateIndividualByUuid,
    getLegalEntityByUuid,
    updateLegalEntityByUuid,
    getModeratorByUuid,
    updateModeratorByUuid,
    changeCurrentUserRole
  };
}, {
  persist: true
});
