package com.ou.services;

import com.ou.pojo.Lecturer;

import java.util.List;

public interface LecturerService {
    List<Lecturer> getAllLecturer();
    List<Lecturer> getLecturerByFacultyId(int facultyId);
}
