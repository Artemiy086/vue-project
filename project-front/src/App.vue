<script setup>
import ViewData from '../src/components/ViewData.vue'
import CrudData from '../src/components/CrudData.vue'
</script>

<script>
const urlBase = 'http://localhost:3000/tasks/'
export async function sendApi(method, url, body = null) {
  try {
    let params = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    }
    if (body != null) {
      params = { ...params, body: JSON.stringify(body) }
    }
    const response = await fetch(`${urlBase}${url}`, params)
    if (response.ok) {
      return response
    } else {
      throw new Error(`Ошибка выполнения запроса\nurl: ${url}\n${method}\n${body}`)
    }
  } catch (error) {
    return { msg: error.message, ok: 0 }
  }
}
</script>

<template>
  <div class="container">
    <header>
      <span class="title">TSIUL</span>
    </header>
    <main class="main">
      <div class="content">
        <h1>Простой планировщик</h1>
        <div class="data">
          <section id="view_data">
            <ViewData />
          </section>
          <section id="update_data">
            <CrudData />
          </section>
        </div>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 7vh;
  background-color: var(--primary);
}
.main {
  width: 100%;
  background-color: var(--primary-light);
  height: 84vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 15px;
}
footer {
  width: 100%;
  background-color: var(--primary-dark);
  height: 9vh;
}

@media screen and (width > 1312px) {
  .title {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 60px;
    font-weight: 700;
  }
  .content {
    min-width: 1047px;
    max-width: 1047px;
  }
  .data {
    display: flex;
    flex-direction: row;
  }
}

@media screen and (width < 1312px) {
  .title {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 40px;
    font-weight: 700;
  }
  .content {
    max-width: 86vw;
    margin-left: 7vw;
    margin-right: 7vw;
  }
}
</style>
