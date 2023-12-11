import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({ name: this.name });
  if (isFacultyExist) {
    throw new Error('Faculty is already exist !');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicFaculty.findOne(query);
  if (!isDepartmentExist) {
    throw new Error('This faculty does not exist !');
  }
  next();
});
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
