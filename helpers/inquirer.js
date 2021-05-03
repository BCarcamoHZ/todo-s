const inquirer = require('inquirer');
require('colors');

const preguntas = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Que desea hacer?',
		pasesize: 10,
		loop: false,
		suffix: 'asdas',
		preffix: 'asdw',
		choices: [
			{
				value: '1',
				name: `${'1.'.yellow} Crear tarea`
			},
			{
				value: '2',
				name: `${'2.'.yellow} Listar tareas`
			},
			{
				value: '3',
				name: `${'3.'.yellow} Listar tareas completadas`
			},
			{
				value: '4',
				name: `${'4.'.yellow} Listar tareas pendientes`
			},
			{
				value: '5',
				name: `${'5.'.yellow} Completar tareas(s)`
			},
			{
				value: '6',
				name: `${'6.'.yellow} Borrar tarea`
			},
			{
				value: '0',
				name: `${'0.'.yellow} Salir\n`
			}
		]
	}
];

const inquirerMenu = async () => {
	console.clear();
	console.log('==========================='.yellow);
	console.log('   Seleccione una opcion   '.yellow);
	console.log('==========================='.yellow);

	const { opcion } = await inquirer.prompt(preguntas);

	return opcion;
};

const pausa = async () => {
	await inquirer.prompt([
		{
			type: 'input',
			message: `Presione ${'[ENTER]'.yellow} para continuar`,
			name: 'input'
		}
	]);
};

const leerInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) {
					return 'Por favor ingrese un valor';
				}
				return true;
			}
		}
	];

	const { desc } = await inquirer.prompt(question);

	return desc;
};

const listarTareasBorrar = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		return {
			value: tarea.id,
			name: `${(i + 1 + '.').green} ${tarea.desc}`
		};
	});

	choices.unshift({
		value: '0',

		name: '0.'.green + ' Cancelar'
	});

	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices
		}
	];

	const { id } = await inquirer.prompt(preguntas);

	return id;
};

const confirmar = async (message) => {
	const { ok } = await inquirer.prompt([
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	]);

	return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
	const choices = tareas.map((tarea) => {
		return {
			value: tarea.id,
			name: tarea.desc,
			checked: tarea.completadoEn ? true : false
		};
	});

	const pregunta = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Selecciones',
			choices
		}
	];

	const { ids } = await inquirer.prompt(pregunta);
	return ids;
};

module.exports = {
	inquirerMenu,
	pausa,
	leerInput,
	listarTareasBorrar,
	confirmar,
	mostrarListadoCheckList
};
