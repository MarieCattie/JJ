import { useAuthStore } from '~/stores/auth';
import createApiClient from '~/utils/api';
import { NitroFetchRequest } from 'nitropack';
import { ServerResponse } from '~/types/api';

export async function useMyClientFetch<T>(url: string, opts?: RequestInit) {
  const authStore = useAuthStore();
  const baseUrl = useRuntimeConfig().public.backendAddress;

  const response = await fetch(
    `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${url}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      ...opts,
    }
  );
  const responseJson = await response.json();
  return responseJson;
}

export default async function useMyFetch<T>(
  request: NitroFetchRequest,
  opts?: any,
  handleError = true
) {
  const authStore = useAuthStore();

  const response = await useFetch<ServerResponse>(request, {
    headers: {
      Authorization: `Bearer ${authStore.token}`,
    },
    baseURL: useRuntimeConfig().public.backendAddress,
    ...opts,
  });
  if (handleError && response.data.value?.errors?.length) {
    throw new Error(`${response.data.value.errors[0].message}`);
  }
  return response;
}

// export async function useChatFetch<T>(url: string, opts?: RequestInit) {
//   try {
//     const authStore = useAuthStore();
//     const baseUrl = useRuntimeConfig().public.chatApiAddress;
  
//     const response = await fetch(
//       `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${url}`,
//       {
//         headers: {
//           Authorization: `Bearer ${authStore.token}`,
//         },
//         ...opts,
//       }
//     );
//     const responseJson = await response.json();
//     if(responseJson.statusCode === 401 || responseJson.statusCode === 409) {
//       authStore.refresh()
//     }
//     return responseJson;
//   } catch (error) {
//   }

// }
export async function useChatFetch<T>(url: string, opts?: RequestInit) {
  const authStore = useAuthStore();
  const baseUrl = useRuntimeConfig().public.chatApiAddress;

  async function fetchWithAuth() {
    const response = await fetch(
      `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${url}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        ...opts,
      }
    );
    const responseJson = await response.json();
    return { response, responseJson };
  }

  try {
    let { response, responseJson } = await fetchWithAuth();

    if (responseJson.statusCode === 401 || responseJson.statusCode === 409) {
      await authStore.refresh();
      ({ response, responseJson } = await fetchWithAuth());
    }

    return responseJson;
  } catch (error) {
    console.error('Error fetching chat data:', error);
    throw error; // Propagate the error to the caller
  }
}