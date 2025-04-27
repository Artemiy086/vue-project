import './assets/main.css'
import { createStore } from 'vuex'
import { createApp } from 'vue'
import App from './App.vue'

async function initApp() {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    let tasks = await response.json()
    const store = createStore({
      state: { data: tasks },
      mutations: {
        postData(state, text) {
          let new_data = state.data.map((item) => {
            return { ...item }
          })
          new_data.push({ id: new_data.length + 1, title: text, done: false })
          state.data = new_data
        },
        updateData(state, task) {
          let new_data = state.data.map((item) => {
            return item.id === task.id ? { ...task } : { ...item }
          })
          state.data = new_data
        },
        deleteData(state, id) {
          let new_data = state.data
            .map((item) => {
              return item.id === id ? null : { ...item }
            })
            .filter(Boolean)
          for (let i = 0; i < new_data.length; i++) {
            if (new_data[i].id > id.value) {
              new_data[i].id -= 1
            }
          }
          state.data = new_data
        },
      },
      getters: {
        getData(state) {
          return state.data
        },
      },
    })
    const app = createApp(App)
    app.use(store)
    app.mount('#app')
  } catch (error) {
    console.error('Ошибка загрузки JSON:', error)
  }
}

initApp()
