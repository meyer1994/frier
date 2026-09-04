# Minimal API Reference — Nuxt UI & VueUse

> This file exists only to give coding agents a quick mental model of the most
> common component/function APIs in this project.

---

## Coding Guidelines

- **Prefer early returns.** Exit functions as soon as pre-conditions fail; avoid
  deep nesting.
- **Happy path on the right.** Only worry about the happy path
- **Prefer `const` over `let`.** Use immutable bindings by default; only use
  `let` when reassignment is truly required.
- **Don't overthink typescript types.** If types are taking too long to fix,
  ignore them, but add a TODO comment in the code

---

## Commands

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `pnpm install`    | Install dependencies             |
| `pnpm dev`        | Start development server (Nuxt)  |
| `pnpm build`      | Build for production             |
| `pnpm generate`   | Generate static site             |
| `pnpm preview`    | Preview production build locally |
| `pnpm lint`       | Run ESLint                       |
| `pnpm lint --fix` | Run ESLint autofix               |
| `pnpm typecheck`  | Run TypeScript type checking     |

---

## Project Structure

```
.
├── app/
│   ├── app.config.ts
│   ├── app.vue
│   ├── assets/           # static assets processed by the build (CSS, fonts, images)
│   ├── components/       # auto-imported Vue components
│   └── pages/            # file-based routes (index.vue, about.vue, etc.)
├── public/               # files served at root, not processed (favicon, robots.txt)
├── nuxt.config.ts
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── AGENTS.md
```

---

## Nuxt UI (v4) — Most Common Components

All components accept `color`, `variant`, `size`, `class`, and `ui` (slot
overrides) unless noted.

### `<UButton>`
```
label?: string
color?: 'primary' | 'neutral' | 'error' | 'warning' | 'success' | 'info'
variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
icon?: string        // Iconify icon name
leadingIcon?: string
trailingIcon?: string
loading?: boolean
loadingAuto?: boolean
square?: boolean
block?: boolean
disabled?: boolean
@click?: (e: MouseEvent) => void | Promise<void>
```
Slots: `leading`, `default`, `trailing`

### `<UInput>` / `<UTextarea>`
```
modelValue?: string | number
placeholder?: string
type?: string          // Input only
required?: boolean
autocomplete?: string
autofocus?: boolean
disabled?: boolean
highlight?: boolean    // force focus ring
icon?: string
leading?: string | object
trailing?: string | object
```
Emits: `update:modelValue`, `change`, `blur`, `focus`

### `<USelect>` / `<USelectMenu>`
```
modelValue?: any
placeholder?: string
items?: Array<{ label, value, icon?, disabled? } | string>
multiple?: boolean
searchable?: boolean     // SelectMenu only
clearable?: boolean
```

### `<UTabs>`
```
items?: Array<{ label, value, icon?, disabled?, badge? }>
modelValue?: string | number
color?: 'primary' | ...
variant?: 'pill' | 'line' | 'soft'
orientation?: 'horizontal' | 'vertical'
```

### `<UAccordion>` / `<UCollapsible>`
```
items?: Array<{ label, icon?, content?, disabled?, slot? }>
multiple?: boolean     // Accordion only
defaultValue?: string | string[]
```

### `<UTable>`
```
data?: T[]
columns?: ColumnDef<T>[]
caption?: string
meta?: TableMeta<T>
virtualize?: boolean | VirtualizerOptions
loading?: boolean
empty?: string
```

### `<UForm>` / `<UFormField>`
```
state?: any          // form object
schema?: ZodSchema | YupSchema | ValibotSchema
validate?: (state) => Promise<Error[]>
validateOn?: 'blur' | 'change' | 'input' | 'submit'
```

### `<UAvatar>`
```
src?: string
alt?: string
text?: string          // initials fallback
icon?: string
size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
color?: 'neutral' | ...
chip?: boolean | ChipProps
```

### `<UBadge>`
```
label?: string | number
variant?: 'solid' | 'outline' | 'soft' | 'subtle'
size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
square?: boolean
```

### `<UCard>` / `<UPageCard>`
```
variant?: 'solid' | 'outline' | 'soft' | 'ghost'

// UCard slots: header, default, footer
// UPageCard slots: top, default, bottom
```

### `<UModal>` / `<UDrawer>` / `<USlideover>`
```
title?: string
description?: string
overlay?: boolean
scrollable?: boolean
fullscreen?: boolean
transition?: boolean
portal?: boolean | string | HTMLElement
close?: boolean | ButtonProps
dismissible?: boolean
preventClose?: boolean
```

### `<UDropdownMenu>` / `<UContextMenu>`
```
items?: Array<{ label, icon?, disabled?, children?: [], to?, href?, click? }>
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
content?: MenuContentProps
```

### `<UTooltip>` / `<UPopover>`
```
text?: string
content?: string | object
delayDuration?: number
side?: 'top' | 'right' | 'bottom' | 'left'
align?: 'start' | 'center' | 'end'
```

### `<USwitch>` / `<UCheckbox>` / `<URadioGroup>`
```
modelValue?: boolean          // Switch / Checkbox
modelValue?: any              // RadioGroup
label?: string
description?: string
color?: 'primary' | ...
```

### `<UToast>` / `<UToaster>`
```
toast.add({ title, description, icon?, color?, duration?, actions?[] })
```

### `<UProgress>` / `<USlider>`
```
modelValue?: number
min?: number
max?: number
steps?: number             // Slider only
```

### `<USkeleton>` / `<USeparator>` / `<UChip>` / `<UKbd>`
```
// Skeleton: class, ui
// Separator: orientation, decorative, class
// Chip: label, inset, position, size, color
// Kbd: value, variant, size
```

### `<UContainer>` / `<ULink>` / `<UIcon>`
```
// Container: padding?, constrained?, class
// Link: to?, href?, external?, target?, active?, activeClass?, exact?, exactActiveClass?
// Icon: name (Iconify), size?, class?
```

### `<UBreadcrumb>` / `<UPagination>` / `<UCommandPalette>`
```
// Breadcrumb: items: Array<{ label, to?, icon?, slot? }>
// Pagination: v-model:page, total, itemsPerPage, showEdges, siblings
// CommandPalette: groups: Array<{ id, items: [{ label, value, icon?, to?, click? }] }], placeholder
```

### `<UColorPicker>` / `<UInputDate>` / `<UInputNumber>` / `<UInputTags>` / `<UInputRating>`
```
// ColorPicker: modelValue (hex), format, modes
// InputDate: modelValue (Date), placeholder, format
// InputNumber: modelValue (number), min, max, step
// InputTags: modelValue (string[]), max, createItem
// InputRating: modelValue (number), max, icon
```

---

## VueUse (v10+) — Most Common Composables

### State & Reactivity
```ts
useToggle(initial?: boolean): [Ref<boolean>, (value?: boolean) => boolean]
useCounter(initial?: number, options?: { min, max, step }): { count, inc, dec, set, reset }
useVModel(props, key, emit?): WritableComputedRef
useVModels(props, emit?): { [K]: WritableComputedRef }
useCloned<T>(source: T): { cloned, sync }
useDebounceFn(fn, wait, options?): DebouncedFunction
useThrottleFn(fn, wait, options?): ThrottledFunction
useIntervalFn(callback, interval?, options?): { pause, resume, isActive }
useTimeoutFn(fn, interval?, options?): { start, stop, isPending }
useInterval(interval?, options?): Ref<number>
useTimeout(interval?): Ref<boolean>
useRafFn(fn, options?): { pause, resume }
```

### Browser / DOM
```ts
useMouse(options?): { x, y, sourceType }
useMouseInElement(target?, options?): { x, y, elementX, elementY, isOutside }
useWindowSize(options?): { width, height }
useElementSize(target?, options?): { width, height }
useElementBounding(target?): { height, width, top, left, bottom, right }
useElementVisibility(target?): Ref<boolean>
useIntersectionObserver(target, callback, options?): { stop, isSupported }
useMutationObserver(target, callback, options?): { stop }
useResizeObserver(target, callback): { stop }
useScroll(element?, options?): { x, y, isScrolling, arrivedState, directions }
useInfiniteScroll(element, onLoadMore, options?)
useDraggable(target, options?): { x, y, style, isDragging }
useDropZone(target, options?): { isOverDropZone, files }
useFocus(target?, options?): { focused, focus, blur }
useFocusWithin(target?, options?): { focused }
useElementHover(target?): Ref<boolean>
useEventListener(target, event, handler, options?): () => void
useClickOutside(target, handler, options?): () => void
useKeyStroke(keys, handler, options?): () => void
onKeyStroke(keys, handler, options?): () => void
useMagicKeys(options?): { current, [keyCombo]: ComputedRef<boolean> }
useTextSelection(): { text, rects, ranges, selection }
useTextareaAutosize(options?): { textarea, input, triggerResize }
useImage(options?): { isLoading, error, isReady }
useFullscreen(target?, options?): { isFullscreen, enter, exit, toggle }
useMediaQuery(query): Ref<boolean>
useBreakpoints(breakpoints?): { greater, greaterOrEqual, smaller, smallerOrEqual, between, current }
useFavicon(newIcon?): Ref<string>
useTitle(newTitle?, options?): Ref<string>
useScriptTag(src, onLoaded?, options?): { load, unload, script }
useStyleTag(css, options?): { id, css, unload }
```

### Storage & Async
```ts
useLocalStorage(key, initial?, options?): RemovableRef<T>
useSessionStorage(key, initial?, options?): RemovableRef<T>
useStorage(key, initial?, storage?, options?): RemovableRef<T>
useStorageAsync(key, initial?, storage?, options?): Ref<T>
useFetch(url, options?): { data, error, status, refresh }
useAsyncState(promise, initialState?, options?): { state, isReady, isLoading, error, execute }
useAsyncQueue(tasks, options?): { activeIndex, result }
useMemoize(fn, options?): MemoizedFunction
useCached(ref, comparator?): Ref<T>
```

### UX / Behavior
```ts
useClipboard(options?): { text, copy, copied, isSupported }
useClipboardItems(options?): { copy, copied, isSupported }
useConfirmDialog(reveal?): { isRevealed, reveal, confirm, cancel, onReveal, onConfirm, onCancel }
useDark(options?): Ref<boolean>
useColorMode(options?): Ref<'light' | 'dark' | 'auto'>
useToggle(preferredColorMode)
useOnline(): Ref<boolean>
useNetwork(): { isOnline, saveData, offlineAt, downlink, effectiveType, type }
useIdle(timeout?, options?): { idle, lastActive }
usePageLeave(): Ref<boolean>
useWindowFocus(): Ref<boolean>
useDocumentVisibility(): Ref<VisibilityState>
usePermission(permissionDesc): { state, isSupported }
useGeolocation(options?): { coords, locatedAt, error, resume, pause }
useBattery(): { charging, chargingTime, dischargingTime, level, isSupported }
useShare(options?): { share, isSupported }
useWebWorker(fn, options?): { data, postMessage, terminate, worker }
useWebSocket(url, options?): { status, data, send, open, close }
useWebNotification(options?): { isSupported, notification, show, close }
usePermission(permission)
useWakeLock(options?): { isSupported, isActive, request, release }
useVirtualList(list, options?): { containerProps, wrapperProps, list }
useFileDialog(options?): { files, open, reset, onChange }
useBase64(target): Ref<string>
useSpeechRecognition(options?): { isSupported, isListening, result, error, start, stop }
useSpeechSynthesis(text, options?): { isSupported, isPlaying, status, speak, stop }
useDateFormat(date, format?, options?): ComputedRef<string>
useTimeAgo(date, options?): Ref<string>
useNow(options?): Ref<Date>
useTimestamp(options?): Ref<number>
useTransition(source, options?): Ref<number>
useStepper(steps?): { index, current, next, previous, isFirst, isLast, goTo }
useCountdown(options?): { remaining, start, stop, reset, isActive }
useVirtualList(list, options?): { list, containerProps, wrapperProps, scrollTo }
useSortable(el, list, options?): void
useParallax(target?): { roll, tilt }
useParentElement(target?): Ref<HTMLElement | null>
useCurrentElement(): Ref<HTMLElement>
useActiveElement(options?): Ref<HTMLElement | null | undefined>
```

### Array / Object helpers (from `@vueuse/shared`)
```ts
useArrayDifference(listA, listB, key?): Ref<T[]>
useArrayEvery(list, fn): Ref<boolean>
useArrayFilter(list, fn): Ref<T[]>
useArrayFind(list, fn): Ref<T | undefined>
useArrayFindIndex(list, fn): Ref<number>
useArrayFindLast(list, fn): Ref<T | undefined>
useArrayIncludes(list, value, comparator?): Ref<boolean>
useArrayJoin(list, separator?): Ref<string>
useArrayMap(list, fn): Ref<U[]>
useArrayReduce(list, fn, initial?): Ref<U>
useArraySome(list, fn): Ref<boolean>
useArrayUnique(list, comparator?): Ref<T[]>
useSorted(array, compare?, options?): Ref<T[]>
useGroupBy(array, key): Ref<Record<string, T[]>>
```

### Component patterns
```ts
useTemplateRefsList<T>(): Ref<T[]>
createReusableTemplate<T>(): [DefineComponent, ReuseComponent]
useMounted(): Ref<boolean>
useSupported(callback): Ref<boolean>
useEventBus<T>(name?): { on, off, emit, reset }
useConfirmDialog()
```

---

## Quick Nuxt UI Composables

```ts
const toast = useToast()            // toast.add({ title, description })
const modal = useModal()            // modal.open(Component, props), modal.close()
const overlay = useOverlay()        // overlay.create(...)
const clipboard = useCopyToClipboard() // clipboard.copy(text)
```

---

## Design Tokens (Tailwind Colors)

Nuxt UI maps `color` prop to these theme colors:
- `primary`, `secondary`, `success`, `info`, `warning`, `danger`, `neutral`

Variants are usually:
- `solid`, `outline`, `soft`, `ghost`, `link`

Sizes are usually:
- `xs`, `sm`, `md`, `lg`, `xl`
