import { defineStore } from 'pinia'

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../modules/user/services/userService'

import {
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
} from '../modules/post/services/postService'

import {
  getAlbumsByUser,
  createAlbum,
  deleteAlbum,
  getPhotosByAlbum,
  uploadPhoto,
  deletePhoto,
} from '../modules/album/services/albumService'

import {
  getTodosByUser,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../modules/todo/services/todoService'

import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from '../modules/comment/services/commentService'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    selectedUser: null,

    posts: [],
    albums: [],
    todos: [],
    photos: [],

    selectedAlbum: null,
    isAlbumDrawerOpen: false,

    comments: [],
    selectedPost: null,
    isPostDialogOpen: false,

    loading: false,
    drawerLoading: false,
    error: null,
  }),

  actions: {
    setError(error) {
      this.error = error?.message || error || null
    },

    resetDetailData() {
      this.selectedUser = null
      this.posts = []
      this.albums = []
      this.todos = []
      this.photos = []
      this.selectedAlbum = null
      this.isAlbumDrawerOpen = false
      this.resetDrawerData()
    },

    resetDrawerData() {
      this.comments = []
      this.selectedPost = null
      this.isPostDialogOpen = false
    },

    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        this.users = await getAllUsers()
      } catch (error) {
        this.setError(error)
      } finally {
        this.loading = false
      }
    },

    async fetchUserDetail(userId) {
      this.loading = true
      this.error = null

      try {
        this.selectedUser = await getUserById(userId)
      } catch (error) {
        this.setError(error)
      }

      try {
        this.posts = await getPostsByUser(userId)
      } catch (error) {
        this.posts = []
        console.error('Posts alınamadı:', error)
      }

      try {
        this.albums = await getAlbumsByUser(userId)
      } catch (error) {
        this.albums = []
        console.error('Albums alınamadı:', error)
      }

      try {
        this.todos = await getTodosByUser(userId)
      } catch (error) {
        this.todos = []
        console.error('Todos alınamadı:', error)
      }

      this.loading = false
    },

    async addUser(userData) {
      this.error = null

      try {
        const newUser = await createUser(userData)
        this.users.unshift(newUser)
      } catch (error) {
        this.setError(error)
      }
    },

    async editUser(userId, userData) {
      this.error = null

      try {
        const updatedUser = await updateUser(userId, userData)

        this.users = this.users.map((user) =>
          user.id === userId ? updatedUser : user
        )

        if (this.selectedUser?.id === userId) {
          this.selectedUser = updatedUser
        }
      } catch (error) {
        this.setError(error)
      }
    },

    async removeUser(userId) {
      this.error = null

      try {
        await deleteUser(userId)

        this.users = this.users.filter(
          (user) => user.id !== userId
        )
      } catch (error) {
        this.setError(error)
      }
    },

    async addPost(userId, data) {
      this.error = null

      try {
        const newPost = await createPost({
          user: userId,
          title: data.title,
          body: data.body,
        })

        this.posts.unshift(newPost)
      } catch (error) {
        this.setError(error)
      }
    },

    async editPost(postId, data) {
      this.error = null

      try {
        const updatedPost = await updatePost(postId, data)

        this.posts = this.posts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      } catch (error) {
        this.setError(error)
      }
    },

    async removePost(postId) {
      this.error = null

      try {
        await deletePost(postId)

        this.posts = this.posts.filter(
          (post) => post.id !== postId
        )
      } catch (error) {
        this.setError(error)
      }
    },

    async openPostDialog(post) {
      this.selectedPost = post
      this.isPostDialogOpen = true

      await this.fetchCommentsByPost(post.id)
    },

    closePostDialog() {
      this.selectedPost = null
      this.comments = []
      this.isPostDialogOpen = false
    },

    async fetchCommentsByPost(postId) {
      this.drawerLoading = true
      this.error = null

      try {
        this.comments = await getCommentsByPost(postId)
      } catch (error) {
        this.setError(error)
      } finally {
        this.drawerLoading = false
      }
    },

    async addComment(postId, data) {
      this.error = null

      try {
        const comment = await createComment({
          post: postId,
          name: data.name,
          email: data.email,
          body: data.body,
        })

        this.comments.unshift(comment)
      } catch (error) {
        this.setError(error)
      }
    },

    async editComment(commentId, data) {
      this.error = null

      try {
        const updatedComment = await updateComment(commentId, data)

        this.comments = this.comments.map((comment) =>
          comment.id === commentId ? updatedComment : comment
        )
      } catch (error) {
        this.setError(error)
      }
    },

    async removeComment(commentId) {
      this.error = null

      try {
        await deleteComment(commentId)

        this.comments = this.comments.filter(
          (comment) => comment.id !== commentId
        )
      } catch (error) {
        this.setError(error)
      }
    },

    async addAlbum(userId, title) {
      this.error = null

      try {
        const newAlbum = await createAlbum({
          user: userId,
          title,
        })

        this.albums.unshift(newAlbum)
      } catch (error) {
        this.setError(error)
      }
    },

    async removeAlbum(albumId) {
      this.error = null

      try {
        await deleteAlbum(albumId)

        this.albums = this.albums.filter(
          (album) => album.id !== albumId
        )

        if (this.selectedAlbum?.id === albumId) {
          this.closeAlbumDrawer()
        }
      } catch (error) {
        this.setError(error)
      }
    },

    async openAlbumDrawer(album) {
      this.selectedAlbum = album
      this.isAlbumDrawerOpen = true

      await this.fetchPhotosByAlbum(album.id)
    },

    closeAlbumDrawer() {
      this.selectedAlbum = null
      this.photos = []
      this.isAlbumDrawerOpen = false
    },

    async fetchPhotosByAlbum(albumId) {
      this.drawerLoading = true
      this.error = null

      try {
        this.photos = await getPhotosByAlbum(albumId)
      } catch (error) {
        this.setError(error)
      } finally {
        this.drawerLoading = false
      }
    },

    async uploadAlbumPhoto(albumId, file, title) {
      this.drawerLoading = true
      this.error = null

      try {
        const newPhoto = await uploadPhoto(albumId, file, title)
        this.photos.unshift(newPhoto)
      } catch (error) {
        this.setError(error)
      } finally {
        this.drawerLoading = false
      }
    },

    async removePhoto(photoId) {
      this.error = null

      try {
        await deletePhoto(photoId)

        this.photos = this.photos.filter(
          (photo) => photo.id !== photoId
        )
      } catch (error) {
        this.setError(error)
      }
    },

    async addTodo(userId, title) {
      this.error = null

      try {
        const newTodo = await createTodo({
          user: userId,
          title,
          completed: false,
        })

        this.todos.unshift(newTodo)
      } catch (error) {
        this.setError(error)
      }
    },

    async toggleTodo(todo) {
      const oldValue = todo.completed
      todo.completed = !todo.completed

      try {
        const updatedTodo = await updateTodo(todo.id, {
          completed: todo.completed,
        })

        Object.assign(todo, updatedTodo)
      } catch (error) {
        todo.completed = oldValue
        this.setError(error)
      }
    },

    async removeTodo(todoId) {
      this.error = null

      try {
        await deleteTodo(todoId)

        this.todos = this.todos.filter(
          (todo) => todo.id !== todoId
        )
      } catch (error) {
        this.setError(error)
      }
    },
  },
})