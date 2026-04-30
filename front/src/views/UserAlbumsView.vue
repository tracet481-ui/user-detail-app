<template>
  <section class="albums-page">
    <div v-if="!openedAlbum" class="albums-list-page">
      <div class="page-header">
        <div>
          <h1>Albums</h1>
          <p>Albüm oluştur, sil, aç ve fotoğrafları yönet.</p>
        </div>
      </div>

      <form class="add-album" @submit.prevent="submitAlbum">
        <input
          v-model="newAlbumTitle"
          placeholder="Yeni albüm adı..."
          required
        />

        <button type="submit">+ Add Album</button>
      </form>

      <div class="albums-grid">
        <article
          v-for="album in albums"
          :key="album.id"
          class="album-card"
        >
          <div class="preview-grid" @click="openAlbum(album)">
            <div
              v-for="(photo, index) in getPreviewPhotos(album)"
              :key="photo.id"
              class="preview-item"
            >
              <img :src="photo.image" :alt="photo.title" />

              <div
                v-if="index === 3 && getExtraCount(album) > 0"
                class="more-overlay"
              >
                +{{ getExtraCount(album) }}
              </div>
            </div>

            <div
              v-for="n in 4 - getPreviewPhotos(album).length"
              :key="`empty-${n}`"
              class="preview-empty"
            >
              🖼️
            </div>
          </div>

          <div class="album-footer">
            <h2>{{ album.title }}</h2>

            <div class="album-actions">
              <button class="open-btn" @click="openAlbum(album)">
                Open
              </button>

              <button class="delete-btn" @click="handleDeleteAlbum(album.id)">
                Delete
              </button>
            </div>
          </div>
        </article>

        <div v-if="!albums.length" class="empty-card">
          This user has no albums.
        </div>
      </div>
    </div>

    <div v-else class="album-detail-page">
      <div class="detail-header">
        <button class="back-btn" @click="closeAlbum">← Albums</button>

        <div>
          <h1>{{ openedAlbum.title }}</h1>
          <p>{{ photos.length }} photos</p>
        </div>
      </div>

      <form class="upload-box" @submit.prevent="submitPhoto">
        <input
          v-model="photoTitle"
          placeholder="Photo title"
        />

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          required
          @change="onFileChange"
        />

        <button type="submit">Upload Photo</button>
      </form>

      <div class="photos-scroll">
        <article
          v-for="photo in photos"
          :key="photo.id"
          class="photo-card"
        >
          <img :src="photo.image" :alt="photo.title" />

          <div class="photo-info">
            <h3>{{ photo.title || 'Photo' }}</h3>

            <button @click="removePhoto(photo.id)">
              Delete
            </button>
          </div>
        </article>

        <p v-if="!photos.length" class="empty-photo">
          Bu albümde fotoğraf yok.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  getAlbumsByUser,
  createAlbum,
  deleteAlbum,
  getPhotosByAlbum,
  uploadPhoto,
  deletePhoto,
} from '../modules/album/services/albumService'

const route = useRoute()

const albums = ref([])
const albumPhotosMap = ref({})

const openedAlbum = ref(null)
const photos = ref([])

const newAlbumTitle = ref('')
const photoTitle = ref('')
const selectedFile = ref(null)
const fileInput = ref(null)

onMounted(async () => {
  await loadAlbums()
})

async function loadAlbums() {
  albums.value = await getAlbumsByUser(route.params.id)

  await Promise.all(
    albums.value.map(async (album) => {
      const albumPhotos = await getPhotosByAlbum(album.id)
      albumPhotosMap.value[album.id] = albumPhotos
    })
  )
}

function getPreviewPhotos(album) {
  return (albumPhotosMap.value[album.id] || []).slice(0, 4)
}

function getExtraCount(album) {
  const count = albumPhotosMap.value[album.id]?.length || 0
  return count > 4 ? count - 4 : 0
}

async function submitAlbum() {
  const title = newAlbumTitle.value.trim()
  if (!title) return

  const created = await createAlbum({
    title,
    user: route.params.id,
  })

  albums.value.unshift(created)
  albumPhotosMap.value[created.id] = []
  newAlbumTitle.value = ''
}

async function handleDeleteAlbum(albumId) {
  if (!confirm('Albüm silinsin mi?')) return

  await deleteAlbum(albumId)
  albums.value = albums.value.filter((album) => album.id !== albumId)

  const copy = { ...albumPhotosMap.value }
  delete copy[albumId]
  albumPhotosMap.value = copy
}

async function openAlbum(album) {
  openedAlbum.value = album
  photos.value = await getPhotosByAlbum(album.id)
  albumPhotosMap.value[album.id] = photos.value
}

function closeAlbum() {
  openedAlbum.value = null
  photos.value = []
}

function onFileChange(event) {
  selectedFile.value = event.target.files?.[0] || null
}

async function submitPhoto() {
  if (!selectedFile.value || !openedAlbum.value) return

  const uploaded = await uploadPhoto(
    openedAlbum.value.id,
    selectedFile.value,
    photoTitle.value
  )

  photos.value.unshift(uploaded)
  albumPhotosMap.value[openedAlbum.value.id] = photos.value

  selectedFile.value = null
  photoTitle.value = ''

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function removePhoto(photoId) {
  await deletePhoto(photoId)

  photos.value = photos.value.filter((photo) => photo.id !== photoId)

  if (openedAlbum.value) {
    albumPhotosMap.value[openedAlbum.value.id] = photos.value
  }
}
</script>

<style scoped>
.albums-page {
  height: calc(100vh - 48px);
  background: #fff;
  border-radius: 18px;
  padding: 28px;
  box-sizing: border-box;
  overflow: hidden;
}

.albums-list-page,
.album-detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header,
.detail-header,
.add-album,
.upload-box {
  flex-shrink: 0;
}

.page-header h1,
.detail-header h1 {
  margin: 0;
  font-size: 28px;
  color: #111827;
}

.page-header p,
.detail-header p {
  margin: 6px 0 0;
  color: #64748b;
}

.add-album,
.upload-box {
  display: flex;
  gap: 12px;
  margin: 24px 0;
}

.add-album input,
.upload-box input {
  flex: 1;
  padding: 13px 14px;
  border: 1px solid #dbe1ea;
  border-radius: 12px;
  outline: none;
}

.add-album button,
.upload-box button,
.open-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.albums-grid {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  align-content: start;
}

.album-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
}

.preview-grid {
  height: 220px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3px;
  overflow: hidden;
  border-radius: 14px;
  cursor: pointer;
}

.preview-item,
.preview-empty {
  position: relative;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-empty {
  color: #94a3b8;
  font-size: 28px;
}

.more-overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  color: white;
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album-footer {
  margin-top: 14px;
}

.album-footer h2 {
  margin: 0 0 14px;
  font-size: 16px;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.album-actions {
  display: flex;
  gap: 10px;
}

.album-actions button {
  flex: 1;
}

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.empty-card,
.empty-photo {
  background: #f8fafc;
  border-radius: 16px;
  padding: 24px;
  color: #64748b;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
}

.back-btn {
  border: none;
  background: #f1efff;
  color: #6c5ce7;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

.photos-scroll {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-content: flex-start;
}

.photo-card {
  width: 190px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
}

.photo-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.photo-info {
  padding: 12px;
}

.photo-info h3 {
  margin: 0 0 10px;
  font-size: 14px;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.photo-info button {
  width: 100%;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 9px 10px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
}
</style>