class TaskManager {
    constructor() {
        this.tasks = [
            { id: 1, title: "Probar FTMO Trading Bot en Demo", priority: "Alta", status: "Pendiente" },
            { id: 2, title: "Probar Detector de Acordes MIDI con Piano USB", priority: "Alta", status: "En Proceso" },
            { id: 3, title: "Revisar Indicadores de la FED y BCRA", priority: "Media", status: "Pendiente" },
            { id: 4, title: "Subir actualizaciones a GitHub", priority: "Alta", status: "Completada" }
        ];
    }

    addTask(title, priority = "Media") {
        const newTask = {
            id: this.tasks.length + 1,
            title,
            priority,
            status: "Pendiente"
        };
        this.tasks.push(newTask);
        return newTask;
    }

    getTasks() {
        return this.tasks;
    }
}

if (typeof module !== 'undefined') {
    module.exports = TaskManager;
}
