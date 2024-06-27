package com.ou.repositories;

import com.ou.pojo.Lecturer;

import java.util.List;

public interface LecturerRepository {
    List<Lecturer> getAllLecturer();
    List<Lecturer> getLecturerByFacultyId(int facultyId);
    void updateLecturer(Lecturer lecturer);
    Lecturer getLecturerById(int id);
    void addLecturer(Lecturer lecturer);
}
