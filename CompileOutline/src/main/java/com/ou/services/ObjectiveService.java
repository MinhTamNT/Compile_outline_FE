package com.ou.services;

import com.ou.pojo.Objective;

public interface ObjectiveService {
    void addOrUpdateObjective(Objective objective);
    Objective getObjectiveById(int id);
    void deleteObjectiveById(int id);
}