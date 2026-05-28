/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.controller;

import com.mathify.dao.CourseDAO;
import com.mathify.model.Course;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

/**
 *
 * @author Akari
 */
@WebServlet("/course-catalog")
public class CourseCatalogServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        CourseDAO dao = new CourseDAO();

        List<Course> courseList = dao.getAllCourses();

        request.setAttribute("courseList", courseList);

        request.getRequestDispatcher("course-catalog.jsp").forward(request, response);
    }
}
