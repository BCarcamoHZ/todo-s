const color = require('colors');
const Tarea = require('./Tarea');

class Tareas {
	constructor() {
		this._listado = {};
	}

	borarTarea(id) {
		delete this._listado[id];
	}

	get listadoArr() {
		const listado = [];
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	}

	listadoCompleto() {
		this.listadoArr.forEach((tarea, index) => {
			const number = tarea.completadoEn === null ? (index + 1 + '.').red : color.green(index + 1 + '.');
			const status = tarea.completadoEn === null ? color.red('Pendiente') : color.green('Completada');
			const tareaString = `${number} ${tarea.desc} :: ${status}`;

			console.log(tareaString);
		});
	}

	listarPendientesCompletadas(completadas = true) {
		let index = 1;
		this.listadoArr.forEach((tarea) => {
			const number = tarea.completadoEn === null ? (index + '.').red : color.green(index + '.');
			const status = tarea.completadoEn === null ? color.red('Pendiente') : color.green(tarea.completadoEn);

			if (completadas) {
				if (tarea.completadoEn) {
					index++;
					const tareaString = `${number} ${tarea.desc} :: ${status}`;
					console.log(tareaString);
				}
			} else {
				if (!tarea.completadoEn) {
					index++;
					const tareaString = `${number} ${tarea.desc} :: ${status}`;
					console.log(tareaString);
				}
			}
		});
	}

	toggleCompletadas(ids = []) {
		ids.forEach((id) => {
			const tarea = this._listado[id];

			if (!tarea.completadas) {
				tarea.completadoEn = new Date().toISOString();
			}
		});
		this.listadoArr.forEach((tarea) => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;
