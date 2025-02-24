<template>
  <div>
    <div class="result-container">
      <h3>Results</h3>
      <p>
        For React:
        {{
          Math.round(
            (props.votes.filter((vote) => vote.option_index === 1).length /
              props.votes.length) *
              100
          )
        }}%
      </p>
      <p>
        For Svelt:
        {{
          Math.round(
            (props.votes.filter((vote) => vote.option_index === 2).length /
              props.votes.length) *
              100
          )
        }}%
      </p>
      <p>
        For Vue.js:
        {{
          Math.round(
            (props.votes.filter((vote) => vote.option_index === 3).length /
              props.votes.length) *
              100
          )
        }}%
      </p>
      <p>
        For Angular.js:
        {{
          Math.round(
            (props.votes.filter((vote) => vote.option_index === 4).length /
              props.votes.length) *
              100
          )
        }}%
      </p>
      <h4>Total Vote Count: {{ props.votes.length }}</h4>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  votes: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
h3 {
  text-align: center;
  text-decoration: underline;
}
h4 {
  text-align: center;
}
.result-container {
  margin: 40px 0;
}
</style>
