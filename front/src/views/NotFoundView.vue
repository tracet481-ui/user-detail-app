<template>
    <div class="flax min-h-screen items-center justify-center bg-slate-100 px-6">
        <div class="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p class="mb-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
                404 Not Found!
            </p>

            <h1 class="mb-3 text-3xl font-bold text-slate-900">Aradığınız sayfa bulunamadı.</h1>
            <p class="mb-6 text-slate-600">Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>

            <router-link 
                to="/"
                class="inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700">
            </router-link>

        </div>
    </div>
</template>