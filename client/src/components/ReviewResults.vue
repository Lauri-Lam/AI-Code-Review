<script setup lang="ts">
import { type ReviewResult } from '@ai-code-review/contracts'
defineProps<{
  result: ReviewResult
}>()
</script>
<template>
  <div>
    <h2>Review Results</h2>
    <h3>Score</h3>
    <p>{{ result.score }}</p>

    <h3>Summary</h3>
    <p>{{ result.summary }}</p>
    <h3>Issues:</h3>
    <ul v-if="result.issues.length !== 0">
      <li v-for="(issue, index) in result.issues" :key="index">
        <p>Issue #{{ index + 1 }}</p>
        <dl>
          <dt>Severity:</dt>
          <dd>{{ issue.severity }}</dd>
          <dt>Title:</dt>
          <dd>{{ issue.title }}</dd>
          <dt>Explanation:</dt>
          <dd>{{ issue.explanation }}</dd>
          <dt>Suggested Fix:</dt>
          <dd>{{ issue.suggestedFix }}</dd>
        </dl>
        <dl v-if="issue.lineNumber !== null">
          <dt>Line Number:</dt>
          <dd>{{ issue.lineNumber }}</dd>
        </dl>
      </li>
    </ul>
    <h3 v-else>No issues to show!</h3>
  </div>
</template>
