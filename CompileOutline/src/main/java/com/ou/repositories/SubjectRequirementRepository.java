package com.ou.repositories;

import com.ou.pojo.SubjectRequirement;
import com.ou.pojo.SubjectRequirementId;

import java.util.List;

public interface SubjectRequirementRepository {
    void addOrUpdateSubjectRequirement(SubjectRequirement subjectRequirement);
    SubjectRequirement getSubjectRequirementById(int subjectId, int subjectRequirementId);
    void deleteSubjectRequirementById(int subjectId, int subjectRequirementId);
}