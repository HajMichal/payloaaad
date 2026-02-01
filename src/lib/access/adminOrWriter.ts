import type { Access } from 'payload'

export const adminOrWriter: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || user.roles?.includes('writer') || false
}
