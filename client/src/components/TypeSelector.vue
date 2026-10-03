<script setup lang="ts">
const reviewTypes: string[] = ['All', 'Correctness', 'Security', 'Performance', 'Readability']

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
<template>
  <div>
    <label for="type">Review Type:</label>
    <select
      id="type"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :value="modelValue"
    >
      <option value="" disabled>Select review type</option>
      <option v-for="type in reviewTypes" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
</template>
