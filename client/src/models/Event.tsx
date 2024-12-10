export type Event = {
  _id?: string
  userId: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  monthAndYear: string
  tagId?: string
}
