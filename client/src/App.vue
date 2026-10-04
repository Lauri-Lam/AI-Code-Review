<script setup lang="ts">
import {
  type ReviewRequest,
  type ReviewResult,
  type Language,
  type ReviewType,
} from '@ai-code-review/contracts'
import { ref } from 'vue'
import CodeInput from './components/CodeInput.vue'
import LangSelector from './components/LangSelector.vue'
import TypeSelector from './components/TypeSelector.vue'
import ReviewResults from './components/ReviewResults.vue'

const code = ref('')
const language = ref<Language | ''>('')
const reviewType = ref<ReviewType | ''>('')

const errorMessage = ref('')
const isLoading = ref(false)

const reviewResult = ref<null | ReviewResult>(null)

const URL = 'http://localhost:3000'

const handleSendReview = async () => {
  try {
    reviewResult.value = null
    errorMessage.value = ''

    if (code.value.trim() === '' || language.value === '' || reviewType.value === '') {
      errorMessage.value = 'All fields must have values!'
      return
    }

    const unReviewedCode: ReviewRequest = {
      code: code.value,
      language: language.value,
      reviewType: reviewType.value,
    }

    isLoading.value = true

    const response = await fetch(`${URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(unReviewedCode),
    })

    const body = await response.json()

    if (!response.ok) {
      errorMessage.value = body.error ?? 'Request failed.'
      return
    }

    reviewResult.value = body
  } catch (error) {
    console.error('Could not complete the review request.', error)
    errorMessage.value = 'Could not complete the review request.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <ReviewResults v-if="reviewResult" :result="reviewResult" />
    <CodeInput v-model="code" />
    <LangSelector v-model="language" />
    <TypeSelector v-model="reviewType" />
    <button @click="handleSendReview" :disabled="isLoading">
      {{ isLoading ? 'Reviewing...' : 'Review Code' }}
    </button>
    <p v-if="isLoading" role="status">Your code is being reviewed.</p>
    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
  </div>
</template>
