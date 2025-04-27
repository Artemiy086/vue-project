<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { sendApi } from '../App.vue'

const store = useStore()
const data = computed(() => store.state.data)
const updateData = (id, text, done) => {
  store.commit('updateData', { id: id, title: text, done: done })
}

async function change(item) {
  const response = await sendApi('PATCH', `${item.id}`, {
    id: item.id,
    text: item.title,
    done: item.done,
  })
  if (response.ok) {
    updateData(item.id, item.title, item.done)
  } else {
    console.log(response.msg)
  }
}
</script>

<template>
  <div class="ViewData">
    <ul>
      <li v-for="(item, index) in data" :key="item.id" class="task">
        <span>{{ item.id }}. {{ item.title }}</span>
        <input
          type="checkbox"
          :id="'checkbox-' + index"
          v-model="item.done"
          @change="change(item)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@media screen and (width > 1312px) {
  .task {
    display: flex;
    flex-direction: row;
    gap: 15px;
    width: 100%;
  }
  .ViewData {
    min-width: 722px;
    max-width: 722px;
    height: min-content;
    border: 1px solid var(--primary-dark);
    padding: 15px;
    border-radius: 15px;
  }
}

@media screen and (width < 1312px) {
  .task {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
  }
  .ViewData {
    width: 100%;
    border: 1px solid var(--primary-dark);
    border-radius: 15px;
    padding: 15px;
  }
}
</style>
