package com.ou.services.impl;

import com.ou.pojo.Requirement;
import com.ou.repositories.RequirementRepository;
import com.ou.services.RequirementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequirementServiceImpl implements RequirementService {
    @Autowired
    private RequirementRepository requirementRepository;

    @Override
    public List<Requirement> getAllRequirements() {
        return this.requirementRepository.getAllRequirements();
    }
}