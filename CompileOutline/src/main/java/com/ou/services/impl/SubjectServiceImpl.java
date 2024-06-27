package com.ou.services.impl;

import com.ou.pojo.Subject;
import com.ou.repositories.SubjectRepository;
import com.ou.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectServiceImpl implements SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;
    @Override
    public List<Subject> getSubjects() {
        return this.subjectRepository.getSubjects();
    }

    @Override
    public void addOrUpdate(Subject subject) {
        this.subjectRepository.addOrUpdate(subject);
    }

    @Override
    public Subject getSubjectById(int id) {
        return this.subjectRepository.getSubjectById(id);
    }

    @Override
    public void deleteSubject(int id) {
        this.subjectRepository.deleteSubject(id);
    }
}
