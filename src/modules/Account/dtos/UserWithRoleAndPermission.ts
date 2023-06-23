export type UserWithRoleAndPermission = {
  username: string
  email: string
  roles: Array<{
    name: string
    description: string
    permissions: Array<{
      name: string
      description: string
    }>
  }>
  
}