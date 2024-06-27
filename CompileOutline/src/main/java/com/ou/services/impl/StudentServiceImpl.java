package com.ou.services.impl;

import com.ou.pojo.Student;
import com.ou.repositories.StudentRepository;
import com.ou.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> getAllStudent() {
        return this.studentRepository.getAllStudent();
    }
}
