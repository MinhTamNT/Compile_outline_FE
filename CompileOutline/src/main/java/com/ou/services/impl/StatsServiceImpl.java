package com.ou.services.impl;

import com.ou.repositories.StatsRepository;
import com.ou.services.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsServiceImpl implements StatsService {
    @Autowired
    private StatsRepository statsRepository;
    @Override
    public Long countStudent() {
        return this.statsRepository.countStudent();
    }

    @Override
    public Long countSubject() {
        return this.statsRepository.countSubject();
    }

    @Override
    public Long countSubmitSpecification() {
        return this.statsRepository.countSubmitSpecification();
    }

    @Override
    public List<Object[]> statsSpecSubmit(int year, String period) {
        return this.statsRepository.statsSpecSubmit(year, period);
    }

    @Override
    public List<Object[]> statsFeedback(int specId) {
        return this.statsRepository.statsFeedback(specId);
    }
}
