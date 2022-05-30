import { test } from '@japa/runner'

test('display login form and status page', async ({client}) => {
  const response = await client.get('/auth/login')
  response.assertStatus(200)
  response.assertSession('success')
})
