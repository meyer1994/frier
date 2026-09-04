<script setup>
const url = ref('')
const loading = ref(false)
const error = ref('')

async function onClick() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch('/api/sandbox')
    url.value = res.url
  } catch {
    error.value = 'Failed to start sandbox. Check console.'
    url.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-3xl font-bold">
      VS Code Server
    </h1>
    <p class="text-muted text-sm">
      Launch a remote VS Code instance via Cloudflare Sandbox
    </p>

    <UButton
      label="Get VS Code URL"
      icon="i-lucide-play"
      size="lg"
      :loading="loading"
      @click="onClick"
    />

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="error"
      class="w-full max-w-md"
    />

    <div
      v-if="url"
      class="flex flex-col items-center gap-2"
    >
      <UBadge
        color="success"
        variant="soft"
        label="Running"
      />
      <ULink
        :to="url"
        target="_blank"
        external
        class="text-lg underline break-all text-center max-w-md"
      >
        {{ url }}
      </ULink>
    </div>
  </UContainer>
</template>
