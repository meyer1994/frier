<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

type Service = 'codeserver' | 'marimo'

const route = useRoute()
const name = computed<Service>(() => route.query.name as Service ?? 'codeserver')
const url = computed(() => `/api/sandbox/${name.value}`)
const { data, error, execute, status } = useFetch(url, { immediate: false })
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-3xl font-bold">
      Sandbox Launcher
    </h1>
    <p class="text-muted text-sm">
      Launch a remote development environment via Cloudflare Sandbox
    </p>

    <UTabs
      :model-value="name"
      :items="([
        { label: 'codeserver', value: 'codeserver' },
        { label: 'marimo', value: 'marimo' }
      ] satisfies TabsItem[])"
      @update:model-value="async (v) => {
        await navigateTo({ query: { name: v as string } })
      }"
    />

    <UButton
      :label="`Launch ${name}`"
      icon="i-lucide-play"
      size="lg"
      :loading="status === 'pending'"
      @click="() => execute()"
    />

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="error.message"
      class="w-full max-w-md"
    />

    <pre>{{ data }}</pre>
  </UContainer>
</template>
