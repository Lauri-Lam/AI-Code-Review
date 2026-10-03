<script setup lang="ts">
const codingLanguages: string[] = ['Python', 'JavaScript', 'TypeScript', 'C#', 'Java']

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
<template>
  <div>
    <label for="language">Language:</label>
    <select
      id="language"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      :value="modelValue"
    >
      <option value="" disabled>Select coding language</option>
      <option v-for="lang in codingLanguages" :key="lang" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>
