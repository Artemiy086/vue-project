<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { sendApi } from '../App.vue'

const id = ref(null)
const errors = ref([])
const action = ref('post')
const new_text = ref('')
const store = useStore()
const postData = (text) => {
  store.commit('postData', text)
}
const updateData = (id, text) => {
  store.commit('updateData', { id: id, title: text, done: false })
}
const deleteData = (id) => {
  store.commit('deleteData', id)
}

async function ClickSave() {
  errors.value = []
  if (action.value === 'post') {
    if (!new_text.value) {
      errors.value.push('Введите текс')
      return
    }
    const response = await sendApi('POST', 'post', { text: new_text.value })
    if (response.ok) {
      postData(new_text.value)
    } else {
      errors.value.push(response.msg)
    }
  }
  if (action.value === 'update') {
    if (id.value > store.state.data.length || id.value < 1) {
      errors.value.push('Введите корректный id')
      return
    }
    if (!id.value) {
      errors.value.push('Введите id')
      return
    }
    if (!new_text.value) {
      errors.value.push('Введите текс')
      return
    }
    const response = await sendApi('PATCH', `${id.value}`, { id: id.value, text: new_text.value })
    if (response.ok) {
      updateData(id.value, new_text.value)
    } else {
      errors.value.push(response.msg)
    }
  }
  if (action.value === 'del') {
    if (id.value > store.state.data.length ||id.value < 1) {
      errors.value.push('Введите корректный id')
      return
    }
    if (!id.value) {
      errors.value.push('Введите id')
      return
    }
    const response = await sendApi('DELETE', `del/${id.value}`, {
      id: id.value,
      text: new_text.value,
    })
    if (response.ok) {
      deleteData(id.value)
    } else {
      errors.value.push(response.msg)
    }
  }
}
</script>

<template>
  <div class="container">
    <ul v-for="error in errors" v-bind:key="error.id">
      <li>{{ error }}</li>
    </ul>
    <select name="" id="" v-model="action" @change="ChangeAction">
      <option value="post">post</option>
      <option value="update">update</option>
      <option value="del">del</option>
    </select>
    <div class="content">
      <div v-if="action != 'post'">
        <input type="number" v-model="id" />
      </div>
      <div v-if="action != 'del'">
        <textarea class="input" type="text" v-model="new_text"></textarea>
      </div>
      <button @click="ClickSave">Применить</button>
    </div>
  </div>
</template>

<style scoped>
.input {
  background-color: inherit;
  border: 1px solid var(--primary-dark);
  max-width: 100%;
  width: max-content;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
}
@media screen and (width > 1312px) {
  .container {
    width: max-content;
    max-width: 290px;
    max-height: 290px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: start;
  }
}

@media screen and (width < 1312px) {
}
</style>
