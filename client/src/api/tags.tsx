// Lucas Chew 260971542

import axios from 'axios'
import { Tag } from '../models/Tag'

async function getAllTags(): Promise<Tag[]> {
  try {
    const response = await axios.get<Tag[]>('/api/tag/getAllTags')
    const items: Tag[] = response.data
    return items
  } catch (error) {
    console.error(error)
    return []
  }
}

async function createTag(name: string, color: string): Promise<Tag> {
  return await axios
    .post('/api/tag/createTag', {
      name,
      color,
      isVisible: true,
    })
    .catch(() => {
      return null
    })
    .then((d) => {
      return d?.data
    })
}

async function updateTag(tag: Tag) {
  const { name, color, _id } = tag

  return await axios
    .patch(`/api/tag/updateTag/${_id}`, {
      name,
      color,
    })
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

async function toggleTagVisibility(tag: Tag) {
  return await axios
    .patch(`/api/tag/toggleVisibility/${tag._id}`)
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

async function deleteTag(tag: Tag) {
  return await axios
    .delete(`/api/tag/${tag._id}`)
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

export { getAllTags, createTag, updateTag, toggleTagVisibility, deleteTag }
