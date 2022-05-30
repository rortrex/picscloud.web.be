import { test } from '@japa/runner'
// first test
test('display welcome page', async ({client}) => {

  const response = await client.get('/')
  response.assertStatus(200)
  response.assertTextIncludes('<a href="/auth/login">se connecter</a>')
})
