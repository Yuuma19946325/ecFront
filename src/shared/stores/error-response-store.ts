import { defineStore } from 'pinia'
import { catchError, map, type Observable } from 'rxjs'

export interface ErrorResponse {
  result: boolean
  status: number
  message: string
}

export const useErrorResponseStore = defineStore('errorResponse-store', {
  state: () => ({
    errorResponse: null as ErrorResponse | null
  }),
  getters: {
    getErrorResponse(state): ErrorResponse | null {
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

export function handleErrors(observable: Observable<any>): Observable<any> {
  return observable.pipe(
    map((response) => response as ErrorResponse),
    catchError((error) => {
      const errorResponse: ErrorResponse = {
        result: error.result || true,
        status: error.status || 500,
        message: error.message || 'Unknown error'
      }
      throw errorResponse
    })
  )
}

export function subscribeWithCommonHandlingIncrementCallback(
  observable: Observable<any>,
  incrementCallback: () => void
): void {
  observable.subscribe({
    next: (response: ErrorResponse) => {
      if (!response.result) incrementCallback()
      useErrorResponseStore().setError(response)
    },
    error: (error: ErrorResponse) => {
      useErrorResponseStore().setError(error)
    }
  })
}

export function subscribeWithCommonHandling(observable: Observable<any>): void {
  observable.subscribe({
    next: (response: ErrorResponse) => {
      useErrorResponseStore().setError(response)
    },
    error: (error: ErrorResponse) => {
      useErrorResponseStore().setError(error)
    }
  })
}
