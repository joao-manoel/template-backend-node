export type UserWithRoleAndPermission = {
  username: string
  email: string
  password: string
  roles: Array<{
    name: string
    description: string
    permissions: Array<{
      name: string
      description: string
    }>
  }>
  
}