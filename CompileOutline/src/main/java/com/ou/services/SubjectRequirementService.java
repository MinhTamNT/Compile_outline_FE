package com.ou.services;

import com.ou.pojo.SubjectRequirement;

public interface SubjectRequirementService {
    void addOrUpdateSubjectRequirement(SubjectRequirement subjectRequirement);
    SubjectRequirement getSubjectRequirementById(int subjectId, int subjectRequirementId);
    void deleteSubjectRequirementById(int subjectId, int subjectRequirementId);
}
