package com.ou.services;

import com.ou.dto.response.SpecificationDto;
import com.ou.pojo.Specification;
import com.ou.pojo.Subject;

import java.util.List;
import java.util.Map;

public interface SpecificationService {
    List<Specification> getAllSpecification();

    List<Subject> getAllSubjectNoAssignment();
    List<Specification> getListSpecificationOfLecturerId(int lecturerId);
    Specification getSpecificationById(int specificationId);
    void createOrUpdateSpecification(Specification specification);
    void submitSpecification(int specificationId);


    Specification findBySubjectAndYear(Subject subject, int year);
    List<Subject>findAllUnassignedSubjectsIncludingCurrent(int currentAssignmentId);
    List<Map<String, Object>> getSpecifications(Map<String, String> params, Boolean isAdmin);
    SpecificationDto getDetailSpecification(int specificationId);
    List<Specification> findSpecSubmitted();
}
