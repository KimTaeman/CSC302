import { Student } from '../data/teams';
import {
  strapiGet,
  strapiGetOne,
  strapiPost,
  strapiPut,
  strapiDelete,
  StrapiEntity,
} from './strapi';

// Strapi Student type
export interface StrapiStudent {
  name: string;
  studentId: string;
}

// Convert Strapi entity to Student interface
const convertStrapiStudentToStudent = (
  strapiStudent: StrapiEntity<StrapiStudent>
): Student => ({
  id: strapiStudent.id.toString(),
  name: strapiStudent.attributes.name,
  studentId: strapiStudent.attributes.studentId,
});

// Convert Student to Strapi format
const convertStudentToStrapiStudent = (
  student: Omit<Student, 'id'>
): StrapiStudent => ({
  name: student.name,
  studentId: student.studentId,
});

// API functions for students
export const studentsApi = {
  // Get all students
  getAll: async (): Promise<Student[]> => {
    try {
      const response = await strapiGet<StrapiStudent>('students', {
        sort: ['name:asc'],
        pagination: {
          pageSize: 100,
        },
      });
      return response.data.map(convertStrapiStudentToStudent);
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error('Failed to fetch students');
    }
  },

  // Get a single student by ID
  getById: async (id: string): Promise<Student> => {
    try {
      const response = await strapiGetOne<StrapiStudent>('students', id);
      return convertStrapiStudentToStudent(response.data);
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      throw new Error(`Failed to fetch student ${id}`);
    }
  },

  // Create a new student
  create: async (studentData: Omit<Student, 'id'>): Promise<Student> => {
    try {
      const strapiStudentData = convertStudentToStrapiStudent(studentData);
      const response = await strapiPost<StrapiStudent>(
        'students',
        strapiStudentData
      );
      return convertStrapiStudentToStudent(response.data);
    } catch (error) {
      console.error('Error creating student:', error);
      throw new Error('Failed to create student');
    }
  },

  // Update a student
  update: async (
    id: string,
    studentData: Partial<Omit<Student, 'id'>>
  ): Promise<Student> => {
    try {
      const strapiStudentData = convertStudentToStrapiStudent(
        studentData as Omit<Student, 'id'>
      );
      const response = await strapiPut<StrapiStudent>(
        'students',
        id,
        strapiStudentData
      );
      return convertStrapiStudentToStudent(response.data);
    } catch (error) {
      console.error(`Error updating student ${id}:`, error);
      throw new Error(`Failed to update student ${id}`);
    }
  },

  // Delete a student
  delete: async (id: string): Promise<void> => {
    try {
      await strapiDelete('students', id);
    } catch (error) {
      console.error(`Error deleting student ${id}:`, error);
      throw new Error(`Failed to delete student ${id}`);
    }
  },
};

