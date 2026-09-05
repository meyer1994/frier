<script setup lang="ts">
const { data, error, execute, status } = useFetch('/api/sandbox/codeserver', { immediate: false })
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-3xl font-bold">
      Sandbox Launcher
    </h1>
    <p class="text-muted text-sm">
      Launch a remote development environment via Cloudflare Sandbox
    </p>

    <UButton
      label="Launch Code Server"
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

    <ULink
      v-if="data?.url"
      :href="data.url"
      target="_blank"
      class="text-primary hover:underline"
    >
      {{ data.url }}
    </ULink>
  </UContainer>
</template>
