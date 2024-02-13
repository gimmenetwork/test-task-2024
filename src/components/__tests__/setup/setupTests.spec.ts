import { beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import getAllUsersBooksResponse from '@/components/__tests__/mocks/mockGetUserBooks'
import 'whatwg-fetch'

export const restHandlers: any = [
  http.get('http://localhost:3000/books', () => {
    return HttpResponse.json(getAllUsersBooksResponse)
  }),
  http.get('http://localhost:3000/users', () => {
    return HttpResponse.json(getAllUsersBooksResponse)
  })
]
const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
