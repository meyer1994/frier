<script setup>
type Service = 'codeserver' | 'marimo'

const services = [
  { value: 'codeserver' as const, label: 'VS Code Server', description: 'Remote VS Code instance', icon: 'i-lucide-code' },
  { value: 'marimo' as const, label: 'Marimo', description: 'Interactive Python notebooks', icon: 'i-lucide-notebook-pen' },
] as const

const selectedLabel = computed(() => services.find(s => s.value === selected.value)?.label ?? '')

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
    <p class="text-xs text-muted -mt-4">
      {{ services.find(s => s.value === selected)?.description }}
    </p>

    <UButton
      :label="`Launch ${selectedLabel}`"
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
