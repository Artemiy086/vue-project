const express = require("express");
const cors = require('cors');
const app = express();
const fs = require("fs").promises;
const path = require("path");
const DATA_PATH = path.join(__dirname, "data.json"); 
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function load_json() {
    try {
        const data = await fs.readFile(DATA_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Ошибка загрузки JSON:", error);
        return [];
    }
}

async function saveJson(data) {
    try {
        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Ошибка сохранения JSON:", error);
        return false;
    }
}


app.get('/tasks', async (req, res) => {
    const tasks = await load_json();
    res.json(tasks);
});

app.patch('/tasks/:id', async (req, res) => {
    const tasks = await load_json();
    const taskId = parseInt(req.params.id);
    const {id, text, done} = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) { 
        return res.status(404).json({ error: "Задача не найдена" });
    }

    tasks[taskIndex] = {id: id, title: text, done: done};
    await saveJson(tasks);
    res.json(tasks[taskIndex]); 
});

app.delete('/tasks/del/:id', async (req, res) => {
    try {
        const tasks = await load_json();
        const taskId = parseInt(req.params.id); // исправлено на parseInt
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex === -1) { 
            return res.status(404).json({ error: "Задача не найдена" });
        }

        tasks.splice(taskIndex, 1);

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id > taskId) {
                tasks[i].id -= 1;
            }
        }

        await saveJson(tasks);

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.post('/tasks/post', async (req, res) => {
    const tasks = await load_json();
    const text = req.body.text;
    tasks.push({id: tasks.length+1, title: text, done: false});
    await saveJson(tasks);

    return res.status(200).json({ ok: 200})
})


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
