package com.ou.services.impl;

import com.ou.pojo.Faculty;
import com.ou.repositories.FacultyRepository;
import com.ou.services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService {
    @Autowired
    private FacultyRepository facultyRepository;
    @Override
    public List<Faculty> getFaculties() {
        return this.facultyRepository.getFaculties();
    }

    @Override
    public void addOrUpdate(Faculty faculty) {
        this.facultyRepository.addOrUpdate(faculty);
    }

    @Override
    public Faculty getFacultyById(int id) {
        return this.facultyRepository.getFacultyById(id);
    }

    @Override
    public Faculty getFacultyOfLecturer(int lecturerId) {
        return this.facultyRepository.getFacultyOfStudentId(lecturerId);
    }

    @Override
    public void deleteFaculty(int id) {
        this.facultyRepository.deleteFaculty(id);
    }
}
