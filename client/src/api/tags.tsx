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

async function createTag(name: string, color: string, isVisible: boolean) {
  return await axios
    .post('/api/tag/createTag', {
      name,
      color,
      isVisible,
    })
    .catch(() => {
      return false
    })
    .finally(() => {
      return true
    })
}

async function updateTag(tag: Tag) {
  const { name, color } = tag

  return await axios
    .patch(`/api/tag/updateTag/${tag._id}`, {
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
