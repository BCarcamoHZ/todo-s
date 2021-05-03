require('colors');

const {
	inquirerMenu,
	pausa,
	leerInput,
	confirmar,
	listarTareasBorrar,
	mostrarListadoCheckList
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/Tareas');

console.clear();

const main = async () => {
	let opt = '';
	const tareas = new Tareas();

	const data = leerDB();
	if (data) {
		tareas.cargarTareasFromArray(data);
	}

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				const desc = await leerInput('Descripción: ');
				tareas.crearTarea(desc);
				break;
			case '2':
				tareas.listadoCompleto();
				break;
			case '3':
				tareas.listarPendientesCompletadas();
				break;
			case '4':
				tareas.listarPendientesCompletadas(false);
				break;
			case '5':
				const ids = await mostrarListadoCheckList(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;
			case '6':
				const id = await listarTareasBorrar(tareas.listadoArr);
				if (id !== '0') {
					const ok = await confirmar('¿Estás Seguro?');
					if (ok) {
						tareas.borarTarea(id);
						console.log('Borrado');
					}
				}

				break;
			default:
				break;
		}

		guardarDB(tareas.listadoArr);

		await pausa();
	} while (opt !== '0');
};

main();
