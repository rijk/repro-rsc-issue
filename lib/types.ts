import type Realm from 'realm'

/** Helper type for Next.js 13 app page params */
export type PageParams<
  T = Record<string, string>,
  U = Record<string, string | string[]>
> = {
  params: T
  searchParams: U
}

/**
 * Below are the Realm Object Model types. Do not edit these directly! Instead:
 *
 * 1) Modify collection schema in Realm
 * 2) Deploy changes
 * 3) Go to https://realm.mongodb.com/groups/636537145f17cf1ed9e6cea5/apps/63653867a207c1793457ef6b/sdks/dataModels
 * 4) Select Language: TypeScript
 * 5) Press Copy All Data Models
 * 6) Paste and find-replace "id?:" for "id:" because come on Mongo
 */

export type Lesson = {
  _id: Realm.BSON.ObjectId
  content?: string
  draft?: Lesson_draft
  intro?: string
  published?: Lesson_published
  slug: string
  title: string
  v?: number
  versions: Realm.List<Lesson_versions>
}

export const LessonSchema = {
  name: 'Lesson',
  properties: {
    _id: 'objectId?',
    content: 'string?',
    draft: 'Lesson_draft',
    intro: 'string?',
    published: 'Lesson_published',
    slug: 'string',
    title: 'string',
    v: 'int?',
    versions: 'Lesson_versions[]',
  },
  primaryKey: '_id',
}

export type Lesson_draft = {
  content?: string
  updated?: Lesson_draft_updated
}

export const Lesson_draftSchema = {
  name: 'Lesson_draft',
  embedded: true,
  properties: {
    content: 'string?',
    updated: 'Lesson_draft_updated',
  },
}

export type Lesson_draft_updated = {
  at: Date
  by: string
}

export const Lesson_draft_updatedSchema = {
  name: 'Lesson_draft_updated',
  embedded: true,
  properties: {
    at: 'date',
    by: 'string',
  },
}

export type Lesson_published = {
  at: Date
  by: string
}

export const Lesson_publishedSchema = {
  name: 'Lesson_published',
  embedded: true,
  properties: {
    at: 'date',
    by: 'string',
  },
}

export type Lesson_versions = {
  content: string
  published?: Lesson_versions_published
  v: number
}

export const Lesson_versionsSchema = {
  name: 'Lesson_versions',
  embedded: true,
  properties: {
    content: 'string',
    published: 'Lesson_versions_published',
    v: 'int',
  },
}

export type Lesson_versions_published = {
  at: Date
  by: string
}

export const Lesson_versions_publishedSchema = {
  name: 'Lesson_versions_published',
  embedded: true,
  properties: {
    at: 'date',
    by: 'string',
  },
}

export type Module = {
  _id: Realm.BSON.ObjectId
  path?: Path
  slug: string
  title: string
  updated?: Module_updated
}

export const ModuleSchema = {
  name: 'Module',
  properties: {
    _id: 'objectId?',
    path: 'Path',
    slug: 'string',
    title: 'string',
    updated: 'Module_updated',
  },
  primaryKey: '_id',
}

export type Module_updated = {
  at: Date
  by: string
}

export const Module_updatedSchema = {
  name: 'Module_updated',
  embedded: true,
  properties: {
    at: 'date',
    by: 'string',
  },
}

export type Organization = {
  _id: Realm.BSON.ObjectId
  colors?: Organization_colors
  domain?: string
  handle: string
  name: string
  seats?: number
}

export const OrganizationSchema = {
  name: 'Organization',
  properties: {
    _id: 'objectId',
    colors: 'Organization_colors',
    domain: 'string?',
    handle: 'string',
    name: 'string',
    seats: 'int?',
  },
  primaryKey: '_id',
}

export type Organization_colors = {
  accent: string
}

export const Organization_colorsSchema = {
  name: 'Organization_colors',
  embedded: true,
  properties: {
    accent: 'string',
  },
}

export type Path = {
  _id: Realm.BSON.ObjectId
  color?: string
  duration?: string
  intro?: string
  modules: Realm.List<Module>
  order: Realm.List<Realm.BSON.ObjectId>
  slug: string
  title: string
  updated?: Path_updated
}

export const PathSchema = {
  name: 'Path',
  properties: {
    _id: 'objectId?',
    color: 'string?',
    duration: 'string?',
    intro: 'string?',
    modules: 'Module[]',
    order: 'objectId[]',
    slug: 'string',
    title: 'string',
    updated: 'Path_updated',
  },
  primaryKey: '_id',
}

export type Path_updated = {
  at: Date
  by: string
}

export const Path_updatedSchema = {
  name: 'Path_updated',
  embedded: true,
  properties: {
    at: 'date',
    by: 'string',
  },
}

export type User = {
  _id: Realm.BSON.ObjectId
  account?: Account
  email: string
  lastLogin?: User_lastLogin
  name: string
  organizationId: Realm.BSON.ObjectId
}

export const UserSchema = {
  name: 'User',
  properties: {
    _id: 'objectId',
    account: 'Account',
    email: 'string',
    lastLogin: 'User_lastLogin',
    name: 'string',
    organizationId: 'objectId',
  },
  primaryKey: '_id',
}

export type User_lastLogin = {
  at?: Date
  ip?: string
  userAgent?: string
}

export const User_lastLoginSchema = {
  name: 'User_lastLogin',
  embedded: true,
  properties: {
    at: 'date?',
    ip: 'string?',
    userAgent: 'string?',
  },
}

export type Account = {
  _id: Realm.BSON.ObjectId
  organizationId: Realm.BSON.ObjectId
  roles: Realm.List<string>
  userId: string
}

export const AccountSchema = {
  name: 'Account',
  properties: {
    _id: 'objectId',
    organizationId: 'objectId',
    roles: 'string[]',
    userId: 'string',
  },
  primaryKey: '_id',
}
