<script setup lang="ts">
import { CODING_LANGUAGES, type Language } from '@ai-code-review/contracts'

defineProps<{
  modelValue: Language | ''
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Language]
}>()
</script>
<template>
  <div>
    <label for="language">Language:</label>
    <select
      id="language"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value as Language)"
      :value="modelValue"
    >
      <option value="" disabled>Select coding language</option>
      <option v-for="lang in CODING_LANGUAGES" :key="lang" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>
