import { IUser, IUserOrganization, UserStateId } from '@/projects/b2b/shared/types/user.types';

export interface IOrganizationListProps {
  organization?: IUserOrganization | null
  organizationIds?: string[]
  singleOrganization?: boolean
  loading?: boolean
  userId?: IUser['userId']
  multiple?: boolean
}

export interface IOrganizationListEmit {
  (
    event: 'update:organization',
    value?: IOrganizationListProps['organization']
  )
  (
    event: 'update:organizationIds',
    value?: IOrganizationListProps['organizationIds']
  )
}

export type UserStateTextMap = {
  [P in UserStateId]: string
}
