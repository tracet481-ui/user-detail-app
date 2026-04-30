<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import CompaniesView from './CompaniesView.vue'




const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// const activeTab = ref(localStorage.getItem('activeTab') || 'posts')

const activeTab = ref('posts')


watch(activeTab, (newTab) => {
  localStorage.setItem('activeTab', newTab)
})

watch(
  () => route.params.id,
  (newId) => {
    userStore.fetchUserDetail(newId)
  }
)

onMounted(() => {
  userStore.fetchUserDetail(route.params.id)
})

const companies = ref([])

function openCompanyDialog() {
  console.log('company dialog to be opened')
}

function editCompany(company) {
  console.log('company to be edited:', company)
}

function removeCompany(id) {
  console.log('company to be deleted:', id)
} 


</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <button
        class="mb-6 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        @click="router.back()"
      >
        ← Geri Dön
      </button>

      <div
        v-if="userStore.loading"
        class="rounded-2xl bg-white p-6 text-slate-600 shadow-sm"
      >
        Veriler yükleniyor...
      </div>

      <div
        v-else-if="userStore.error"
        class="rounded-2xl bg-red-50 p-6 text-red-600 shadow-sm"
      >
        {{ userStore.error }}
      </div>

      <div v-else-if="userStore.selectedUser" class="space-y-6">
        <div class="rounded-3xl bg-white p-8 shadow-sm">
          <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div class="flex items-center gap-4">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-2xl font-bold text-white"
              >
                {{ userStore.selectedUser.name?.charAt(0) }}
              </div>

              <div>
                <p class="text-sm uppercase tracking-widest text-slate-500">
                  User Profile
                </p>
                <h1 class="text-3xl font-bold text-slate-900">
                  {{ userStore.selectedUser.name }}
                </h1>
                <p class="mt-1 text-slate-500">
                  @{{ userStore.selectedUser.username }}
                </p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">E-posta</p>
                <p class="mt-1 text-sm text-slate-700">{{ userStore.selectedUser.email }}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Telefon</p>
                <p class="mt-1 text-sm text-slate-700">{{ userStore.selectedUser.phone }}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Şehir</p>
                <p class="mt-1 text-sm text-slate-700">{{ userStore.selectedUser.address?.city }}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 p-4">
                <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Şirket</p>
                <p class="mt-1 text-sm text-slate-700">{{ userStore.selectedUser.company?.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <button
            class="rounded-xl px-5 py-2.5 text-sm font-medium transition"
            :class="activeTab === 'posts'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'"
            @click="activeTab = 'posts'"
          >
            Posts
          </button>

          <button
            class="rounded-xl px-5 py-2.5 text-sm font-medium transition"
            :class="activeTab === 'albums'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'"
            @click="activeTab = 'albums'"
          >
            Albums
          </button>

          <button
            class="rounded-xl px-5 py-2.5 text-sm font-medium transition"
            :class="activeTab === 'todos'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'"
            @click="activeTab = 'todos'"
          >
            Todos
          </button>


          <button
            class="rounded-xl px-5 py-2.5 text-sm font-medium transition"
            :class="activeTab === 'companies'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'"
            @click="activeTab = 'companies'"
          >
            Company
          </button>

 

        </div>

        <div v-if="activeTab === 'posts'">
          <div v-if="userStore.posts.length" class="grid gap-4">
            <div
              v-for="post in userStore.posts"
              :key="post.id"
              class="rounded-2xl bg-white p-5 shadow-sm"
            >
              <h3 class="mb-2 text-lg font-semibold text-slate-800">
                {{ post.title }}
              </h3>
              <p class="text-sm leading-6 text-slate-600">
                {{ post.body }}
              </p>
            </div>
          </div>

          <div v-else class="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
            Bu kullanıcıya ait paylaşım bulunamadı.
          </div>
        </div>

        <div v-else-if="activeTab === 'albums'">
          <div v-if="userStore.albums.length" class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="album in userStore.albums"
              :key="album.id"
              class="rounded-2xl bg-white p-5 shadow-sm"
            >
              <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Album
              </p>
              <h3 class="text-base font-semibold text-slate-800">
                {{ album.title }}
              </h3>
            </div>
          </div>

          <div v-else class="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
            Bu kullanıcıya ait albüm bulunamadı.
          </div>
        </div>

        <div v-else-if="activeTab === 'todos'">
          <div v-if="userStore.todos.length" class="grid gap-4">
            <div
              v-for="todo in userStore.todos"
              :key="todo.id"
              class="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
            >
              <p class="pr-4 text-sm text-slate-700">
                {{ todo.title }}
              </p>

              <span
                class="rounded-full px-3 py-1 text-xs font-semibold"
                :class="todo.completed
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'"
              >
                {{ todo.completed ? 'Tamamlandı' : 'Bekliyor' }}
              </span>
            </div>
          </div>

          <div v-else class="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
            Bu kullanıcıya ait görev bulunamadı.
          </div>
        </div>


        <div v-else-if="activeTab === 'companies'" class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-black text-slate-950">
                Company
              </h1>

              <p class="mt-2 text-slate-500">
                Add, edit, and delete companies.
              </p>
            </div>

            <button
              class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              @click="openCompanyDialog"
            >
              + New Company
            </button>
          </div>

          <div class="grid gap-5 md:grid-cols-2">
            <article
              v-for="company in companies"
              :key="company.id"
              class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 class="text-xl font-bold text-slate-900">
                {{ company.name }}
              </h2>

              <p class="mt-2 text-sm text-slate-500">
                {{ company.catch_phrase || 'Slogan yok' }}
              </p>

              <div class="mt-5 space-y-2 text-sm text-slate-600">
                <p>🏢 {{ company.bs || 'İş alanı yok' }}</p>
                <p>📞 {{ company.phone || 'Telefon yok' }}</p>
                <p>🌐 {{ company.website || 'Website yok' }}</p>
                <p>
                  📍
                  {{
                    [company.city, company.street, company.suite, company.zipcode]
                      .filter(Boolean)
                      .join(', ') || 'Lokasyon yok'
                  }}
                </p>
              </div>

              <div class="mt-5 flex gap-3">
                <button
                  class="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                  @click="editCompany(company)"
                >
                  Düzenle
                </button>

                <button
                  class="rounded-xl bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600"
                  @click="removeCompany(company.id)"
                >
                  Delete
                </button>
              </div>
            </article>

            <div
              v-if="!companies.length"
              class="rounded-3xl bg-white p-6 text-slate-500 shadow-sm"
            >
              Henüz şirket yok.
            </div>
          </div>
        </div>



        <!-- <div v-else-if="activeTab === 'companies'">
          <CompaniesView />
        </div> -->




      </div>
    </div>
  </div>
</template>