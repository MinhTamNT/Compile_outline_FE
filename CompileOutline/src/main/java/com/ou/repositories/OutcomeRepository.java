package com.ou.repositories;

import com.ou.pojo.Objective;
import com.ou.pojo.Outcome;

public interface OutcomeRepository {
    void addOrUpdateOutcome(Outcome outcome);
    Outcome getOutcomeById(int id);
    void deleteOutcomeById(int id);
}