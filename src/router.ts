// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/account`
  | `/account/billing`
  | `/account/billing/invoice`
  | `/account/entities`
  | `/account/entities/:uid`
  | `/account/entities/verify-now/:entityId`
  | `/account/entities/verify-now/company`
  | `/account/entities/verify-now/freelancer`
  | `/account/financial-hub`
  | `/account/financial-hub/earning/details/:id`
  | `/account/financial-hub/invoice-details/:id`
  | `/account/financial-hub/withdrawal-details/:id`
  | `/account/manage-listing`
  | `/account/manage-listing/edit/:id`
  | `/account/manage-listing/form`
  | `/account/manage-proposal`
  | `/account/my-profile`
  | `/account/order-management`
  | `/account/order-management/:id`
  | `/account/profile/setting`
  | `/account/seller-profile`
  | `/account/seller-profile/:uid`
  | `/account/team-management`
  | `/catalog/category`
  | `/catalog/search`
  | `/catalog/sub-category/:uid`
  | `/chat`
  | `/chat/:chatRoomId`
  | `/check-inbox`
  | `/checkout/:id`
  | `/checkout/success`
  | `/confirm-email`
  | `/create`
  | `/email-confirmation`
  | `/find-talent`
  | `/forbidden-access`
  | `/forgotpassword`
  | `/identity-verified`
  | `/invitation`
  | `/invitation-status`
  | `/login`
  | `/myinfo`
  | `/myinfo-biz`
  | `/privacy-policy`
  | `/reset-password`
  | `/seller`
  | `/service-detail/:serviceId`
  | `/setup-organisation`
  | `/setup-organisation/success`
  | `/setup-organisation/verification-inprogress`
  | `/singpass-login`
  | `/singpass-review`
  | `/singpass-test`
  | `/singpass/individual-review`
  | `/singpass/success`
  | `/success`
  | `/terms-conditions`
  | `/verifying-status`

export type Params = {
  '/account/entities/:uid': { uid: string }
  '/account/entities/verify-now/:entityId': { entityId: string }
  '/account/financial-hub/earning/details/:id': { id: string }
  '/account/financial-hub/invoice-details/:id': { id: string }
  '/account/financial-hub/withdrawal-details/:id': { id: string }
  '/account/manage-listing/edit/:id': { id: string }
  '/account/order-management/:id': { id: string }
  '/account/seller-profile/:uid': { uid: string }
  '/catalog/sub-category/:uid': { uid: string }
  '/chat/:chatRoomId': { chatRoomId: string }
  '/checkout/:id': { id: string }
  '/service-detail/:serviceId': { serviceId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
