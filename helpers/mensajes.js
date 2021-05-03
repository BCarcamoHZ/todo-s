require('colors');

const mostrarMenu = () => {
	return new Promise((resolve) => {
		console.clear();
		console.log('==========================='.yellow);
		console.log('   Seleccione una opcion   '.yellow);
		console.log('==========================='.yellow);

		console.log(`${'1.'.yellow} Crear tarea`);
		console.log(`${'2.'.yellow} Listar tareas`);
		console.log(`${'3.'.yellow} Listar tareas completadas`);
		console.log(`${'4.'.yellow} Listar tareas pendientes`);
		console.log(`${'5.'.yellow} Completar tareas(s)`);
		console.log(`${'6.'.yellow} Borrar tarea`);
		console.log(`${'0.'.yellow} Salir\n`);

		const readLine = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});

		readLine.question('Seleccione una opción: ', (opt) => {
			readLine.close();
			resolve(opt);
		});
	});
};

const pausa = () => {
	return new Promise((resolve) => {
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});

		readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt) => {
			readline.close();
			resolve();
		});
	});
};

module.exports = {
	mostrarMenu,
	pausa
};
