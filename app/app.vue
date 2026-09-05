<script setup>
type Service = 'codeserver' | 'marimo'

const services: { value: Service; label: string; description: string }[] = [
  { value: 'codeserver', label: 'VS Code Server', description: 'Remote VS Code instance' },
  { value: 'marimo', label: 'Marimo', description: 'Interactive Python notebooks' },
]

const selected = ref<Service>('codeserver')
const url = ref('')
const loading = ref(false)
const error = ref('')

async function onClick() {
  loading.value = true
  error.value = ''
  url.value = ''
  try {
    const res = await $fetch(`/api/sandbox/${selected.value}`)
    url.value = res.url
  } catch {
    error.value = 'Failed to start sandbox. Check console.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-3xl font-bold">
      Sandbox Launcher
    </h1>
    <p class="text-muted text-sm">
      Launch a remote development environment via Cloudflare Sandbox
    </p>

    <URadioGroup
      v-model="selected"
      :items="services"
      orientation="horizontal"
    />

    <UButton
      :label="`Launch ${services.find(s => s.value === selected)?.label}`"
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
