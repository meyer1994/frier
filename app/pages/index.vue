<script setup lang="ts">
import type { SandboxTask } from '~/server/utils/sandbox'

const { data: tasks, refresh, status: listStatus } = await useFetch<SandboxTask[]>('/api/sandbox/list')
const isLoading = computed(() => listStatus.value === 'pending')

const toast = useToast()

async function onStart() {
  try {
    await $fetch('/api/sandbox/start', { method: 'POST' })
    toast.add({ title: 'Sandbox started', color: 'success' })
    await refresh()
  } catch {
    toast.add({ title: 'Failed to start sandbox', color: 'error' })
  }
}

async function onStop(id: string) {
  if (!confirm(`Stop sandbox ${id}?`)) return
  try {
    await $fetch(`/api/sandbox/${id}`, { method: 'DELETE' })
    toast.add({ title: 'Sandbox stopped', color: 'success' })
    await refresh()
  } catch {
    toast.add({ title: 'Failed to stop sandbox', color: 'error' })
  }
}

const selectedTask = ref<SandboxTask | null>(null)
const detailOpen = ref(false)

async function onView(id: string) {
  try {
    const task = await $fetch<SandboxTask>(`/api/sandbox/${id}`)
    selectedTask.value = task
    detailOpen.value = true
  } catch {
    toast.add({ title: 'Failed to load sandbox details', color: 'error' })
  }
}

const columns = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'image', header: 'Image' },
  { accessorKey: 'url', header: 'URL' },
  { accessorKey: 'startedAt', header: 'Started' },
  { accessorKey: 'actions', header: '' }
]
</script>

<template>
  <UContainer class="py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">
        Cloudflare Sandboxes
      </h1>
      <div class="flex gap-2">
        <UButton
          label="Start httpbin"
          icon="i-lucide-play"
          @click="onStart"
        />
        <UButton
          label="Refresh"
          icon="i-lucide-refresh-cw"
          variant="outline"
          :loading="isLoading"
          @click="refresh"
        />
      </div>
    </div>

    <UTable
      :data="tasks || []"
      :columns="columns"
      :loading="isLoading"
      empty="No sandboxes running."
    >
      <template #url-cell="{ row }">
        <ULink
          v-if="row.original.url"
          :to="row.original.url"
          target="_blank"
          external
          class="text-sm underline"
        >
          Open
        </ULink>
        <span v-else>—</span>
      </template>

      <template #actions-cell="{ row }">
        <div class="flex gap-2">
          <UButton
            size="xs"
            variant="ghost"
            icon="i-lucide-eye"
            @click="onView(row.original.id)"
          />
          <UButton
            size="xs"
            variant="ghost"
            color="error"
            icon="i-lucide-square"
            @click="onStop(row.original.id)"
          />
        </div>
      </template>
    </UTable>

    <UModal
      v-model:open="detailOpen"
      title="Sandbox Details"
    >
      <template #body>
        <div
          v-if="selectedTask"
          class="space-y-2"
        >
          <p><strong>ID:</strong> {{ selectedTask.id }}</p>
          <p><strong>Status:</strong> {{ selectedTask.status }}</p>
          <p><strong>Image:</strong> {{ selectedTask.image }}</p>
          <p>
            <strong>URL:</strong> <ULink
              v-if="selectedTask.url"
              :to="selectedTask.url"
              target="_blank"
              external
            >{{ selectedTask.url }}</ULink><span v-else>—</span>
          </p>
          <p><strong>Started:</strong> {{ selectedTask.startedAt || '—' }}</p>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>
