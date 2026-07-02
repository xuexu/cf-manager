import apiClient from './client';

export interface AccountListParams {
  page?: number;
  pageSize?: number;
  filter?: 'all' | 'active' | 'unverified';
  search?: string;
}

export const accountsApi = {
  getAll: (params: AccountListParams = {}) =>
    apiClient.get('/accounts', { params }),
  create: (data: any) => apiClient.post('/accounts', data),
  delete: (id: number) => apiClient.delete(`/accounts/${id}`),
  test: (id: number) => apiClient.post(`/accounts/${id}/test`),
  testBatch: (data: { ids?: number[]; onlyUnverified?: boolean }) =>
    apiClient.post('/accounts/test-batch', data, { timeout: 600000 }),
  updateFeatures: (id: number, enabled_features: string) =>
    apiClient.patch(`/accounts/${id}/features`, { enabled_features }),
  importCsv: (file: File, skipVerify = false) => {
    const formData = new FormData();
    formData.append('file', file);
    if (skipVerify) formData.append('skipVerify', '1');
    return apiClient.post('/accounts/import-csv', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 600000,
    });
  },
  batchImport: (accounts: Array<{ name: string; api_token: string }>, enabled_features?: string) =>
    apiClient.post('/accounts/batch', { accounts, enabled_features }),
};