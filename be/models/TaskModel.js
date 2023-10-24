import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Task = db.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    uuid: {
        type: DataTypes.STRING,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255],
        }
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    assembly_approval: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    assembly_progress: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    assembly_image: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    machining_approval: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    machining_progress: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    machining_image: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    std_part_approval: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    std_part_progress: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    std_part_image: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    material_approval: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    material_progress: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    material_image: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    design_approval: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    design_progress: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    design_image: {
        type: DataTypes.TEXT,
        defaultValue: null,
    }
}, {
    freezeTableName: true,
});

Users.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(Users, { foreignKey: 'userId' });

export default Task;
