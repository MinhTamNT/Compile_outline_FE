package com.ou.services.impl;

import com.ou.pojo.SubjectRequirement;
import com.ou.pojo.SubjectRequirementId;
import com.ou.repositories.SubjectRequirementRepository;
import com.ou.services.SubjectRequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubjectRequirementServiceImpl implements SubjectRequirementService {
    @Autowired
    private SubjectRequirementRepository subjectRequirementRepository;
    @Override
    public void addOrUpdateSubjectRequirement(SubjectRequirement subjectRequirement) {
        this.subjectRequirementRepository.addOrUpdateSubjectRequirement(subjectRequirement);
    }

    @Override
    public SubjectRequirement getSubjectRequirementById(int subjectId, int subjectRequirementId) {
        return this.subjectRequirementRepository.getSubjectRequirementById(subjectId, subjectRequirementId);
    }

    @Override
    public void deleteSubjectRequirementById(int subjectId, int subjectRequirementId) {
        this.subjectRequirementRepository.deleteSubjectRequirementById(subjectId, subjectRequirementId);
    }
}
