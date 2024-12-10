import axios from 'axios'

export default async function getAuthenticated(): Promise<boolean> {
  return axios.get('/api/user')
}