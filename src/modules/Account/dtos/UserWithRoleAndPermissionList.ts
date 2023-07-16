export type UserWithRoleAndPermissionList = {
  total: number
  totalPage: number
  users: Array<{
    id: string
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
  }>
}