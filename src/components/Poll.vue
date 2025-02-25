<template>
  <div class="container">
    <h1>{{ poll.question }}</h1>
    <Transition name="result" mode="out-in">
      <div v-if="!result" class="options-container">
        <div
          class="options"
          @click="vote(option.value)"
          v-for="option in poll.options"
          :key="option.value"
        >
          {{ option.text }}
        </div>
      </div>
      <div v-else>
        <Results :votes="votes" />
      </div>
    </Transition>
    <div class="button-container">
      <button v-if="showButton" @click="showResult">See Result</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, Transition } from "vue";
import { createClient } from "@supabase/supabase-js";
import Results from "./Results.vue";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const votes = ref([]);

const poll = ref({
  id: null,
  question: "",
  options: [],
});

const getPoll = async () => {
  const { data, error } = await supabase
    .from("vzy-polls")
    .select("*")
    .limit(1)
    .single();
  if (data) {
    poll.value = data;
  } else {
    console.log("error fetching poll...");
  }
};

const result = ref(false);
const showButton = ref(false);

const showResult = () => {
  result.value = !result.value;
  allVotes();
};

const vote = async (value) => {
  if (!poll.value.id) return;
  try {
    const { error } = await supabase
      .from("poll-votes")
      .insert([{ poll_id: poll.value.id, option_index: value }]);
    showButton.value = true;
    alert("YOU'VE VOTED SUCCESSFULLY!");
  } catch (error) {
    if (error) {
      console.log("error voting!!!");
    }
  }
};

const allVotes = async () => {
  if (!poll.value.id) return;
  const { data, error } = await supabase.from("poll-votes").select("*");
  if (data) {
    votes.value = data;
  } else {
    console.log("no votes");
  }
};

onMounted(async () => {
  await getPoll();
});
</script>

<style scoped>
.container {
  border: 1px solid #e6e6e6;
  padding: 30px 10px;
  border-radius: 10px;
}

.options-container {
  margin-top: 50px;
  padding: 35px 0px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
}

.options {
  border: 1px solid #e6e6e6;
  padding: 15px 5px;
  margin: 5px 0px;
  cursor: pointer;
  list-style-type: none;
  border-radius: 5px;
}

.options:hover {
  background-color: #f2f2f2;
}

.button-container {
  text-align: center;
  margin: 30px 0px;
}
.button-container button {
  padding: 10px 20px;
  cursor: pointer;
  background-color: tomato;
  border: 0;
  border-radius: 5px;
  color: floralwhite;
}

.button-container button:hover {
  opacity: 0.7;
}

.result-enter-active,
.result-leave-active {
  transition: transform 0.3s;
}
.result-enter-from {
  transform: translateX(100%);
}
.result-leave-to {
  transform: translateX(-100%);
}

@media only screen and (max-width: 480px) {
  h1 {
    font-size: 25px;
  }
}
</style>
