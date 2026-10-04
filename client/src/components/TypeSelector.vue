<script setup lang="ts">
import { REVIEW_TYPES, type ReviewType } from '@ai-code-review/contracts'

defineProps<{
  modelValue: ReviewType | ''
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ReviewType]
}>()
</script>
<template>
  <div>
    <label for="type">Review Type:</label>
    <select
      id="type"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value as ReviewType)"
      :value="modelValue"
    >
      <option value="" disabled>Select review type</option>
      <option v-for="type in REVIEW_TYPES" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
</template>
