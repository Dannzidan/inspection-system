import Task from "../models/TaskModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

// define the task attributes that can be used to filter the tasks
const taskAttributes = [
    'uuid',
    'id',
    'name',
    'startDate',
    'endDate',
    'task_image',
    'task_progress',
  ];
  

export const getTasks = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Task.findAll({
                attributes: taskAttributes, // Get all data
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email']
                    }
                ]
            });
        } else {
            response = await Task.findAll({
                attributes: taskAttributes, // Get all data
                where: {
                    userId: req.userId
                },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email']
                    }
                ]
            });
        }
        res
            .status(200)
            .json(response);
    } catch (error) {
        res
            .status(500)
            .json({msg: error.message});
    }
}

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!task) 
            return res
                .status(404)
                .json({msg: "Data tidak ditemukan"});
        let response;
        if (req.role === "admin") {
            response = await Task.findOne({
                attributes: taskAttributes,
                where: {
                    id: task.id
                },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email']
                    }
                ]
            });
        } else {
            response = await Task.findOne({
                attributes: taskAttributes,
                where: {
                    [Op.and]: [
                        {
                            id: task.id
                        }, {
                            userId: req.userId
                        }
                    ]
                },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'email']
                    }
                ]
            });
        }

        res
            .status(200)
            .json(response);
    } catch (error) {
        res
            .status(500)
            .json({msg: error.message});
    }
}

export const createTask = async (req, res) => {
    const {name, startDate, endDate, task_image} = req.body;
    try {
        await Task.create(
            {name: name, startDate: startDate, endDate: endDate, task_image: task_image,userId: req.userId}
        );
        res
            .status(201)
            .json({msg: "Task Created Successfully"});
    } catch (error) {
        res
            .status(500)
            .json({msg: error.message});
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!task) 
            return res
                .status(404)
                .json({msg: "Data tidak ditemukan"});
        const {
            name,
            startDate,
            endDate,
            task_image,
            task_progress,
        } = req.body;
        if (req.role === "admin") {
            await Task.update({
                name,
                startDate,
                endDate,
                task_image,
                task_progress,
            }, {
                where: {
                    id: task.id
                }
            });
        } else {
            if (req.userId !== task.userId) 
                return res
                    .status(403)
                    .json({msg: "Akses terlarang"});
            await Task.update({
                name,
                startDate,
                endDate,
                task_image,
                task_progress,
            }, {
                where: {
                    [Op.and]: [
                        {
                            id: task.id
                        }, {
                            userId: req.userId
                        }
                    ]
                }
            });
        }
        res
            .status(200)
            .json({msg: "Task updated successfuly"});
    } catch (error) {
        res
            .status(500)
            .json({msg: error.message});
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!task) 
            return res
                .status(404)
                .json({msg: "Data tidak ditemukan"});
        const {
            name,
            startDate,
            endDate,
            task_image,
            task_progress,
        } = req.body;
        if (req.role === "admin") {
            await Task.destroy({
                where: {
                    id: task.id
                }
            });
        } else {
            if (req.userId !== task.userId) 
                return res
                    .status(403)
                    .json({msg: "Akses terlarang"});
            
            // Check if the confirmation flag is sent from the frontend
            if (!req.body.confirmation) {
                return res
                    .status(200)
                    .json({msg: "Task deletion requires confirmation"});
            }

            await Task.destroy({
                where: {
                    [Op.and]: [
                        {
                            id: task.id
                        }, {
                            userId: req.userId
                        }
                    ]
                }
            });
        }
        res
            .status(200)
            .json({msg: "Task deleted successfully"});
    } catch (error) {
        res
            .status(500)
            .json({msg: error.message});
    }
}