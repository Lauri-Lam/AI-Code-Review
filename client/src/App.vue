<script setup lang="ts">
import type { ReviewRequest } from '../../server/src/schemas/reviewRequestSchema.ts'
import type { ReviewResult } from '../../server/src/schemas/reviewResultSchema.ts'
import { ref } from 'vue'
import CodeInput from './components/CodeInput.vue'
import LangSelector from './components/LangSelector.vue'
import TypeSelector from './components/TypeSelector.vue'
import ReviewResults from './components/ReviewResults.vue'

const code = ref('')
const language = ref('')
const reviewType = ref('')

const errorMessage = ref('')
const isLoading = ref(false)

const reviewResult = ref<null | ReviewResult>(null)

const URL = 'http://localhost:3000'

const handleSendReview = async () => {
  reviewResult.value = null
  const unReviewedCode: ReviewRequest = {
    code: code.value,
    language: language.value,
    reviewType: reviewType.value,
  }

  try {
    errorMessage.value = ''
    isLoading.value = true

    const response = await fetch(`${URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(unReviewedCode),
    })

    if (!response.ok) {
      errorMessage.value = 'Response from backend was not ok!'
      return
    }

    reviewResult.value = await response.json();

  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = String(error)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <ReviewResults v-if="reviewResult" :result="reviewResult"/>
    <CodeInput v-model="code" />
    <LangSelector v-model="language" />
    <TypeSelector v-model="reviewType" />
    <button @click="handleSendReview">Review Code</button>
  </div>
</template>
