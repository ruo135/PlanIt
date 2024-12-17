// Lucas Chew 260971542

import axios from 'axios'
import { Event } from '../models/Event'

async function createEvent(
  title: string,
  desc: string,
  startDate: Date,
  endDate: Date,
  tagId?: string
): Promise<Event> {
  return await axios
    .post('/api/event/createEvent', {
      title,
      description: desc,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tagId,
    })
    .catch(() => {
      return null
    })
    .then((d) => {
      return d?.data
    })
}

async function updateEvent(event: Event) {
  const { title, description, startDate, endDate, tagId, _id } = event

  return await axios
    .patch(`/api/event/updateEvent/${_id}`, {
      title,
      description,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      tagId,
    })
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await axios.get<Event[]>(`/api/event/getAllEvents`)
    const items: Event[] = response.data
    return items
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getEventsFromMonthYear(
  month: number,
  year: number
): Promise<Event[]> {
  try {
    const response = await axios.get<Event[]>(
      `/api/event/get/${month}%2F${year}`
    )
    const items: Event[] = response.data
    return items
  } catch (error) {
    console.error(error)
    return []
  }
}

async function deleteEvent(event: Event) {
  return await axios
    .delete(`/api/event/${event._id}`)
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

export {
  createEvent,
  updateEvent,
  getAllEvents,
  getEventsFromMonthYear,
  deleteEvent,
}
