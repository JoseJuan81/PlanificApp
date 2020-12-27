import { isEmpty } from 'functionallibrary';
import { ApolloError } from 'apollo-server-lambda';

export const getCreateTask = async (source, { task }, { models }) => {
	const {
		CompanyModel,
		ExpenseModel,
		TaskModel,
		UserModel,
	} = models;

	try {
		const { companyId, expenses, subTasks, userId, ...rest } = task;

		/**
		 * Crear tarea en BD
		 */
		const taskCreated = await TaskModel.create({ companyId, subTasks, userId, ...rest });
		console.log('====== ACTIVIDAD CREADA =======');

		/**
		 * Agregar id de actividad en cada gasto y
		 * Crear gastos
		 */
		let newExpenses = [];
		if (!isEmpty(expenses)) {
			const relatedExpenses = taskCreated.addTaskIdToExpenses(expenses, taskCreated.id);
		try {
			newExpenses = await ExpenseModel.create(relatedExpenses);
		} catch (error) {
			console.log('Error al crear gastos relacionados a un actividad', error);
			return new ApolloError(
				'Error al crear gastos asociados a nueva actividad',
				'400',
			);
		}
		/**
		* Actualizar Actividad
		*/
			taskCreated.expenses = taskCreated.getExpensesIds(newExpenses);
			taskCreated.spent = taskCreated.calculateTotalSpent(expenses);
		}

		/**
		* Actualizar parentTaskId de subtasks
		*/
		if (!isEmpty(subTasks)) {
			const parentTaskId = taskCreated.get('id');
			TaskModel.updateMany({ _id: { $in: subTasks } }, { parentTaskId })
				.then(() => {
					console.log('====== SUBTASK ACTUALIZA =======');
				})
				.catch((error) => {
					return new ApolloError(
					'Error al actualizar subtasks con parentTaskId',
					'400',
					);
				})
		}
		/**
		 * Agregar taskId a Company y User
		 */
		const [company, user] = await Promise.all([
			CompanyModel.findById(companyId),
			UserModel.findById(userId),
		]);
		if (company && user) {
			company.tasksId = [].concat(company.get('tasksId'), companyId);
			user.tasksId = [].concat(user.get('tasksId'), userId);
		}	

		// await Promise.all([
		// 	taskCreated.save(),
		// 	company.save(),
		// 	user.save(),
		// ]);
		await taskCreated.save();

		return {
			code: 200,
			success: true,
			message: `Tarea: ${taskCreated.name} creada exitosamente`,
			task: taskCreated,
		};
	} catch (error) {
		console.log('error al crear actividad', error);
		return {
			code: 400,
			success: false,
			message: 'Crear Tarea falló',
			task: {},
		};
	}
};

export const getUpdateTask = async (_, { task }, { models }) => {
  const { TaskModel } = models;
  const { id, ...rest } = task;
  const options = {
    new: true,
  };
  try {
    const updated = await TaskModel.findByIdAndUpdate(id, rest, options);
    return {
      code: 201,
      message: `La actividad ${updated.name} fue actualizada exitosamente`,
      success: true,
      task: updated,
    };
  } catch (error) {
    console.log('ERROR', error);
    return {
      code: 400,
      message: error,
      success: false,
      task: {},
    };
  }
};

export const getHardDeleteTask = async (_, { id }, { models }) => {
  const { TaskModel } = models;
  try {
    const result = await TaskModel.findByIdAndDelete(id);
    return {
      code: 201,
      success: true,
      message: `Actividad ${result.name} eliminada exitosamente`,
      task: result,
    };
  } catch (error) {
    return {
      code: 400,
      success: false,
      message: 'La actividad NO fue eliminada',
      task: {},
    };
  }
};

export const getDeleteTask = async (_, { id }, { models }) => {};
