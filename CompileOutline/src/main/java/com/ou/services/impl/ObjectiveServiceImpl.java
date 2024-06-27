package com.ou.services.impl;

import com.ou.pojo.Objective;
import com.ou.repositories.ObjectiveRepository;
import com.ou.services.ObjectiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObjectiveServiceImpl implements ObjectiveService {
    @Autowired
    private ObjectiveRepository objectiveRepository;
    @Override
    public void addOrUpdateObjective(Objective objective) {
        this.objectiveRepository.addOrUpdateObjective(objective);
    }

    @Override
    public Objective getObjectiveById(int id) {
        return this.objectiveRepository.getObjectiveById(id);
    }

    @Override
    public void deleteObjectiveById(int id) {
        this.objectiveRepository.deleteObjectiveById(id);
    }
}