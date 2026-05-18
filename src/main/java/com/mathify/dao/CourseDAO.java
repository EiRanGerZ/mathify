package com.mathify.dao;

import com.mathify.model.Course;

import java.util.ArrayList;
import java.util.List;

public class CourseDAO {

    // Simulasi database
    private static List<Course> courseList = new ArrayList<>();

    // INSERT
    public void insertCourse(Course course) {

        courseList.add(course);

        System.out.println("Course berhasil ditambahkan!");
    }

    // READ
    public List<Course> getAllCourses() {

        return courseList;
    }

    // UPDATE
    public void updateCourse(int id, Course updatedCourse) {

        for (Course course : courseList) {

            if (course.getId() == id) {

                course.setTitle(updatedCourse.getTitle());
                course.setDescription(updatedCourse.getDescription());
                course.setLevel(updatedCourse.getLevel());

                System.out.println("Course berhasil diupdate!");

                return;
            }
        }

        System.out.println("Course tidak ditemukan!");
    }

    // DELETE
    public void deleteCourse(int id) {

        courseList.removeIf(course -> course.getId() == id);

        System.out.println("Course berhasil dihapus!");
    }
}