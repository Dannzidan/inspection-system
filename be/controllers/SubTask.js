import SubTask from "../models/SubTaskModel.js";

// define the task attributes that can be used to filter the tasks
const taskAttributes = [
  "uuid",
  "name",
  "taskId",
  "design_image",
  "design_progress",
  "design_approval",
  "material_image",
  "material_progress",
  "material_approval",
  "std_part_image",
  "std_part_progress",
  "std_part_approval",
  "machining_image",
  "machining_progress",
  "machining_approval",
  "assembly_image",
  "assembly_progress",
  "assembly_approval",
];

export const createSubTask = async (req, res) => {
  const {
    name,
    taskId,
    design_image,
    design_progress,
    design_approval,
    material_image,
    material_progress,
    material_approval,
    std_part_image,
    std_part_progress,
    std_part_approval,
    machining_image,
    machining_progress,
    machining_approval,
    assembly_image,
    assembly_progress,
    assembly_approval,
  } = req.body;
  try {
    await SubTask.create({
      name,
      taskId,
      design_image,
      design_progress,
      design_approval,
      material_image,
      material_progress,
      material_approval,
      std_part_image,
      std_part_progress,
      std_part_approval,
      machining_image,
      machining_progress,
      machining_approval,
      assembly_image,
      assembly_progress,
      assembly_approval,
    });
    res.status(201).json({ msg: "SubTask Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSubTasks = async (req, res) => {
  try {
    const subtask = await SubTask.findAll({
      where: {
        taskId: req.params.id,
      },
    });
    if (!subtask) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await SubTask.findAll({
      attributes: taskAttributes,
      where: {
        taskId: req.params.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSubtaskId = async (req, res) => {
  try {
    const subtask = await SubTask.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!subtask) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await SubTask.findOne({
      attributes: taskAttributes,
      where: {
        uuid: req.params.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSubTasks = async (req, res) => {
  try {
    const subtask = await SubTask.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!subtask) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      name,
      design_image,
      design_progress,
      design_approval,
      material_image,
      material_progress,
      material_approval,
      std_part_image,
      std_part_progress,
      std_part_approval,
      machining_image,
      machining_progress,
      machining_approval,
      assembly_image,
      assembly_progress,
      assembly_approval,
    } = req.body;
    if (req.role === "admin") {
      await SubTask.update(
        {
          name,
          design_image,
          design_progress,
          design_approval,
          material_image,
          material_progress,
          material_approval,
          std_part_image,
          std_part_progress,
          std_part_approval,
          machining_image,
          machining_progress,
          machining_approval,
          assembly_image,
          assembly_progress,
          assembly_approval,
        },
        {
          where: {
            id: subtask.id,
          },
        }
      );
    }
    res.status(200).json({ msg: "SubTask updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!subtask) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await SubTask.destroy({
        where: {
          id: subtask.id,
        },
      });
    }
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
