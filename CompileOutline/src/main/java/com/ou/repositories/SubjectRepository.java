package com.ou.repositories;

import com.ou.pojo.Subject;

import java.util.List;

public interface SubjectRepository {
    List<Subject> getSubjects();
    void addOrUpdate(Subject subject);
    Subject getSubjectById(int id);
    void deleteSubject(int id);
}
