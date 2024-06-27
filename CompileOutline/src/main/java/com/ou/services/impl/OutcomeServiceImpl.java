package com.ou.services.impl;

import com.ou.pojo.Outcome;
import com.ou.repositories.ObjectiveRepository;
import com.ou.repositories.OutcomeRepository;
import com.ou.services.OutcomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OutcomeServiceImpl implements OutcomeService {
    @Autowired
    private OutcomeRepository outcomeRepository;

    @Override
    public void addOrUpdateOutcome(Outcome outcome) {
        this.outcomeRepository.addOrUpdateOutcome(outcome);
    }

    @Override
    public Outcome getOutcomeById(int id) {
        return this.outcomeRepository.getOutcomeById(id);
    }

    @Override
    public void deleteOutcomeById(int id) {
        this.outcomeRepository.deleteOutcomeById(id);
    }
}