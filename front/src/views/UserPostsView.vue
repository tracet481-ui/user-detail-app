<template>
  <div class="posts-page">
    <div class="page-header">
      <div>
        <h1>Posts</h1>
        <p>Add, edit, delete posts and manage comments.</p>
      </div>

      <button class="primary-btn" @click="openCreatePost">
        + New Post
      </button>
    </div>

    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>

        <div class="post-actions">
          <button class="see-btn" @click="openPost(post)">
            See more and comments
          </button>

          <button class="edit-btn" @click="openEditPost(post)">
            Edit
          </button>

          <button class="delete-btn" @click="removePost(post.id)">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- POST CREATE / EDIT MODAL -->
    <div v-if="showPostForm" class="overlay" @click.self="closePostForm">
      <div class="form-modal">
        <h2>{{ editingPost ? 'Post Düzenle' : 'Yeni Post' }}</h2>

        <input
          v-model="postForm.title"
          placeholder="Post title"
        />

        <textarea
          v-model="postForm.body"
          placeholder="Post body"
        ></textarea>

        <div class="modal-actions">
          <button class="cancel-btn" @click="closePostForm">
            Vazgeç
          </button>

          <button class="primary-btn" @click="savePost">
            Kaydet
          </button>
        </div>
      </div>
    </div>

    <!-- COMMENTS MODAL -->
    <div v-if="selectedPost" class="overlay" @click.self="closeCommentModal">
      <div class="comment-modal">
        <button class="close-btn" @click="closeCommentModal">×</button>

        <div class="modal-left">
          <h2>{{ selectedPost.title }}</h2>
          <p>{{ selectedPost.body }}</p>
        </div>

        <div class="modal-right">
          <h3>Comments</h3>

          <div class="comment-list">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item"
            >
              <img
                class="comment-avatar"
                :src="`https://i.pravatar.cc/80?u=${comment.email}`"
                alt="avatar"
              />

              <div class="comment-body">
                <div class="comment-head">
                  <strong>{{ comment.name }}</strong>
                  <span>{{ comment.email }}</span>
                </div>

                <p>{{ comment.body }}</p>

                <div class="comment-actions">
                  <button @click="editComment(comment)">Edit</button>
                  <button class="danger-text" @click="removeComment(comment.id)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="comment-form">


            <textarea
              v-model="commentForm.body"
              placeholder="Write comment..."
            ></textarea>

            <button class="primary-btn full" @click="saveComment">
              {{ editingCommentId ? 'Update Comment' : 'Add Comment' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
} from '../modules/post/services/postService'

import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../modules/comment/services/commentService'

const route = useRoute()

const posts = ref([])
const comments = ref([])
const selectedPost = ref(null)

const showPostForm = ref(false)
const editingPost = ref(null)

const postForm = reactive({
  title: '',
  body: '',
})

const editingCommentId = ref(null)

const commentForm = reactive({

  body: '',
})

onMounted(async () => {
  await loadPosts()
})

async function loadPosts() {
  posts.value = await getPostsByUser(route.params.id)
}

function openCreatePost() {
  editingPost.value = null
  postForm.title = ''
  postForm.body = ''
  showPostForm.value = true
}

function openEditPost(post) {
  editingPost.value = post
  postForm.title = post.title
  postForm.body = post.body
  showPostForm.value = true
}

function closePostForm() {
  showPostForm.value = false
}

async function savePost() {
  if (!postForm.title.trim() || !postForm.body.trim()) return

  if (editingPost.value) {
    const updated = await updatePost(editingPost.value.id, {
      title: postForm.title,
      body: postForm.body,
    })

    const index = posts.value.findIndex((p) => p.id === updated.id)
    posts.value[index] = updated
  } else {
    const created = await createPost({
      title: postForm.title,
      body: postForm.body,
      user: route.params.id,
    })

    posts.value.unshift(created)
  }

  closePostForm()
}

async function removePost(id) {
  if (!confirm('Should this post be deleted?')) return

  await deletePost(id)
  posts.value = posts.value.filter((post) => post.id !== id)
}

async function openPost(post) {
  selectedPost.value = post
  comments.value = await getCommentsByPost(post.id)

  resetCommentForm()
}

function closeCommentModal() {
  selectedPost.value = null
}

function resetCommentForm() {
  editingCommentId.value = null
  commentForm.name = ''
  commentForm.email = ''
  commentForm.body = ''
}

async function saveComment() {
  if (!commentForm.body.trim()) return

  if (editingCommentId.value) {
    const updated = await updateComment(editingCommentId.value, {
      body: commentForm.body,
    })

    const index = comments.value.findIndex(c => c.id === updated.id)
    comments.value[index] = updated
  } else {
    const created = await createComment({
      post: selectedPost.value.id,
      body: commentForm.body,
      name: currentUser.value.name,
      email: currentUser.value.email,
    })

    comments.value.push(created)
  }

  commentForm.body = ''
  editingCommentId.value = null
}

function editComment(comment) {
  editingCommentId.value = comment.id

  commentForm.body = comment.body
}

async function removeComment(id) {
  await deleteComment(id)
  comments.value = comments.value.filter((comment) => comment.id !== id)
}


import { getUserById } from '../services/userService'

  const currentUser = ref(null)

  onMounted(async () => {
    await loadPosts()

    currentUser.value = await getUserById(route.params.id)
  })



</script>

<style scoped>
.posts-page {
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  flex-shrink: 0;
}

.page-header h1 {
  margin: 0;
  font-size: 30px;
  color: #111827;
}

.page-header p {
  margin: 6px 0 0;
  color: #64748b;
}

.primary-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 11px 18px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(108, 92, 231, 0.22);
}

.full {
  width: 100%;
}

.post-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.post-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 22px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.post-content h3 {
  margin: 0 0 10px;
  color: #111827;
}

.post-content p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.post-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.see-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}

.edit-btn {
  background: #f1f5f9;
  color: #334155;
  border: none;
  padding: 10px 16px;
  border-radius: 14px;
  cursor: pointer;
}

.delete-btn {
  background: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 10px 16px;
  border-radius: 14px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 24px;
}

.form-modal {
  width: 480px;
  background: white;
  border-radius: 24px;
  padding: 26px;
}

.form-modal h2 {
  margin: 0 0 18px;
}

.form-modal input,
.form-modal textarea,
.comment-form input,
.comment-form textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 12px;
  outline: none;
  box-sizing: border-box;
}

.form-modal textarea,
.comment-form textarea {
  min-height: 120px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  border: none;
  background: #f1f5f9;
  color: #334155;
  padding: 11px 18px;
  border-radius: 14px;
  cursor: pointer;
}

.comment-modal {
  width: 980px;
  height: 80vh; /* 🔥 FIX */
  background: white;
  border-radius: 26px;
  display: grid;
  grid-template-columns: 1fr 390px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 18px;
  border: none;
  background: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
}

.modal-left {
  padding: 34px;
  border-right: 1px solid #e5e7eb;
}

.modal-left h2 {
  margin: 0 0 16px;
}

.modal-left p {
  color: #475569;
  line-height: 1.7;
}

.modal-right {
  padding: 28px;
  display: flex;
  flex-direction: column;
  min-height: 520px;
}

.modal-right {
  padding: 28px;
  display: flex;
  flex-direction: column;
  height: 100%; /* 🔥 */
}

.comment-list {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
}

.comment-item {
  display: flex;
  gap: 12px;
}

.comment-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-body {
  flex: 1;
}

.comment-head {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.comment-head strong {
  color: #111827;
  font-size: 14px;
}

.comment-head span {
  color: #94a3b8;
  font-size: 12px;
}

.comment-body p {
  margin: 8px 0;
  color: #475569;
  font-size: 14px;
  line-height: 1.5;
}

.comment-actions button {
  border: none;
  background: transparent;
  color: #6c5ce7;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin-right: 12px;
}

.danger-text {
  color: #dc2626 !important;
}

.comment-form {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  background: white;
}
</style>