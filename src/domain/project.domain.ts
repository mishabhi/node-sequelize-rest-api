import { UUID, DataTypes, Model } from 'sequelize';
import { dbConfig } from '../config/database';


export class Project extends Model<Project> {

  get id(): number {
    return this.getDataValue('id') as number;
  }

  set id(id: number) {
    this.setDataValue('id', id)
  }

  get name(): string {
    return this.getDataValue('name');
  };

  set name(name: string) {
    this.setDataValue('name', name)
  }

  get description(): Date {
    return this.getDataValue('description');
  };

  set description(description: Date) {
    this.setDataValue('description', description)
  }

  get status(): String {
    return this.getDataValue('status');
  };

  set status(status: String) {
    this.setDataValue('status', status)
  }

  get createdAt(): Date {
    return this.getDataValue('createdAt');
  };

  set createdAt(createdAt: Date) {
    this.setDataValue('createdAt', createdAt)
  }

  get updatedAt(): Date {
    return this.getDataValue('updatedAt');
  };

  set updatedAt(updatedAt: Date) {
    this.setDataValue('updatedAt', updatedAt)
  }

  get deletedAt(): Date {
    return this.getDataValue('deletedAt');
  };

  set deletedAt(deletedAt: Date) {
    this.setDataValue('deletedAt', deletedAt)
  }
}

Project.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: new DataTypes.STRING(200),
    allowNull: true,
  },
  status: {
    type: new DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  sequelize: dbConfig,
  tableName: 'project',
});

export default Project;
