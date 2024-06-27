package com.ou.services;

import com.ou.pojo.Subject;

import java.util.List;

public interface SubjectService {
    List<Subject> getSubjects();
    void addOrUpdate(Subject subject);
    Subject getSubjectById(int id);
    void deleteSubject(int id);
}
