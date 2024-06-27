package com.ou.services;

import com.ou.pojo.Outcome;

public interface OutcomeService {
    void addOrUpdateOutcome(Outcome outcome);
    Outcome getOutcomeById(int id);
    void deleteOutcomeById(int id);
}