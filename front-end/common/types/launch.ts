import { IPaginationData } from './paginationData'

export interface ILaunch {
  _id: string
  flightNumber: number
  logo: string
  missionName: string
  dateUtc: string
  rocket: IRocket
  result: boolean
  webcast: string
  isReused: boolean
  createdAt: Date
}

export interface IRocket {
  _id: string
  name: string
}

export interface ILaunches extends IPaginationData {
  result: ILaunch[]
}

