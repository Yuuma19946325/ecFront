import { defineStore } from 'pinia'

export interface ErrorResponse {
  result: boolean
  status: number
  message: string
}

export const useErrorResponseStore = defineStore('errorResponse-store', {
  state: () => ({
    errorResponse: new Object() as ErrorResponse
  }),
  getters: {
    getErrorResponse(state): ErrorResponse {
      return state.errorResponse
    }
  },
  actions: {
    setError(errorResponse: ErrorResponse) {
      this.errorResponse = errorResponse
    },
    clearError() {
      this.errorResponse = new Object() as ErrorResponse
    }
  }
})
