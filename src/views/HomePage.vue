<script setup>
import { ref } from 'vue'

const tooltiptxt = ref('Copy')
const prompt = ref('')
const allPrompts = ref([])

function btnCopyClick(text) {
  navigator.clipboard.writeText(text).then(() => {
    tooltiptxt.value = 'Copied'
    setTimeout(() => {
      tooltiptxt.value = 'Copy'
    }, 2000)
  }).catch(() => {
    return
  })
}

function btnDeleteClick(index) {
  console.log(index)
  allPrompts.value.splice(index, 1)
  console.log(allPrompts.value)
}

function savePrompt() {
  allPrompts.value.push(prompt.value)
  prompt.value = ''
  console.log(allPrompts.value)
}

function undoText() {
  prompt.value = ''
}

</script>

<template>
  <div class="container py-3">
    <section class="input-prompt">
      <h3 class="text-center">Save Your AI Prompt</h3>
      <p class="text-center">
        Save your favorite AI Prompt with <b class="text-color"><i>Smart Prompt</i></b> right here!
      </p>

      <form class="py-3" @submit.prevent="savePrompt">
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            v-model="prompt"
          ></textarea>
          <label for="floatingTextarea">Write your prompt ...</label>
        </div>
        <div class="d-flex justify-content-between w-100 pt-2">
          <button type="button" class="btn btn-undo" @click="undoText">Undo</button>
          <button type="submit" class="btn btn-save">Save</button>
        </div>
      </form>
    </section>

    <section class="prompt-group py-5">
      <h6>Your Prompts</h6>
      <div class="row py-3 g-3">
        <div class="col-12 position-relative" v-for="(item, index) in allPrompts" :key="index">
          <div class="card p-3 position-relative">
            <p class="mb-3">
              {{ item }}
            </p>

            <div>
              <v-tooltip interactive location="start">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    class="btn-copy position-absolute"
                    @click="btnCopyClick(item)"
                  >
                    <span class="fs-6"><i class="fa-solid fa-copy"></i></span>
                  </button>
                </template>
                <span>{{ tooltiptxt }}</span>
              </v-tooltip>
            </div>
          </div>
          <button
            class="btn-delete position-absolute"
            @click="btnDeleteClick(index)"
          >
            <span class="fs-6"><i class="fa-solid fa-trash"></i></span>
          </button>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.form-control {
  height: 300px;
  resize: none;
  overflow-y: scroll;
  scrollbar-width: none;
}

.btn-undo,
.btn-save {
  padding: 5px 20px;
  color: white;
}

.btn-save {
  background-color: var(--danger-color);
}

.btn-save:hover {
  box-shadow: rgba(249, 83, 83, 0.342) -4px 9px 25px -6px;
}

.btn-undo {
  background-color: var(--warning-color);
}

.btn-undo:hover {
  background-color: #f8ad9d !important;
}

.form-control:focus {
  box-shadow: none;
  border-color: #cddafd !important;
}

.card {
  border-color: #d6ccc2;
}

.card:hover {
  cursor: pointer;
}

.col-12:hover .btn-delete {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}


.btn-copy, .btn-delete {
  bottom: 10px;
  right: 10px;
  color: #d6ccc2;
  background-color: #efe9e354;
  border: 1px solid #d6ccc254;
  border-radius: 5px;
  padding: 2px 3px;
}

.btn-delete {
  opacity: 0;
  right: -30px;
  color: var(--danger-color);
  background-color: var(--danger-color-100);
  border: 1px solid var(--danger-color-100);
}

</style>
