import axios from 'axios'
import router from '../../router/web/index'

export async function logout() {
  try {
    const res = await axios.delete('/api/users/logout', {
      withCredentials: true, 
    })
    if (res.data.success) {
      router.push('/login')
    }
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
