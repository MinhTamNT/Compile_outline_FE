package com.ou.repositories;

import com.ou.pojo.Objective;

public interface ObjectiveRepository {
    void addOrUpdateObjective(Objective objective);
    Objective getObjectiveById(int id);
    void deleteObjectiveById(int id);
}