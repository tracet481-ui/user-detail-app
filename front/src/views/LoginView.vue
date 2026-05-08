<template>

    <div class = "login-page">
        <div class = "login-card">
            <h1>
                Login
            </h1>

            <p>
                {{ selectedUserName }} hesabına giriş yap
            </p>


            <input
            v-model = "form.username "
            placeholder ="Username" />
            
            <input
                v-model="form.password"
                type="password"
                placeholder="Password"
            />
        

            <button  @click="handleLogin">
                Login
            </button>
    
        </div>
    </div>

</template>

<script setup>

    import { reactive, computed } from "vue"
    import { useRoute, useRouter } from "vue-router" 
    import { useAuthStore } from "../stores/authStore"
    import { useToastStore } from "../stores/toastStore"


    const route = useRoute ()
    const router = useRouter ()


    const authStore = useAuthStore ()
    const toastStore = useToastStore ()


    const form = reactive ({
        username: route.query.username || "",
        password: "",
    })


    const selectedUserName = computed (() =>  {
        return route.query.username || "Kullanıcı"

    })



    // async function handleLogin () {
    //     if (!form.username  || !form.password ) {

    //         toastStore.showError("Username ve password zorunlu ! ")
    //         return 

    //     }

    //     try {
    //         await authStore.login(form) 

    //         toastStore.showSuccess("Giriş Başarılı")
            
    //         router.push(`/user/${route.query.userId}/posts`)
    //         }   catch (error) {

    //         toastStore.showError(error.message || "Login Başarısız! ")

    //     }


    // }


    async function handleLogin() {
            if (!form.username || !form.password) {
                toastStore.showError('Username ve password zorunlu.')
                return
            }

            try {
                const loggedUser = await authStore.login({
                username: form.username,
                password: form.password,
                })

                toastStore.showSuccess('Giriş başarılı.')

                const userId = route.query.userId || loggedUser.id

                await router.push(`/user/${userId}/posts`)
                window.location.reload()            } catch (error) {
                toastStore.showError(
                error.message || 'Login başarısız.'
                )
            }
            }

    
</script>


<style scoped>
.login-page {
  min-height: 100vh;
  background: #f4f6fb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 420px;
  background: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.1);
}

.login-card h1 {
  margin: 0 0 8px;
  color: #111827;
}

.login-card p {
  margin-bottom: 24px;
  color: #64748b;
}

.login-card input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #dbe1ea;
  margin-bottom: 14px;
}

.login-card button {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background: #6c5ce7;
  color: white;
  font-weight: 800;
  cursor: pointer;
}
</style>