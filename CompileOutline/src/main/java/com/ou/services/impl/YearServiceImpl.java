package com.ou.services.impl;

import com.ou.pojo.Year;
import com.ou.repositories.YearRepository;
import com.ou.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YearServiceImpl implements YearService {
    @Autowired
    private YearRepository yearRepository;

    @Override
    public List<Year> getYears() {
        return this.yearRepository.getYears();
    }

    @Override
    public void addOrUpdateYear(Year year) {
        this.yearRepository.addOrUpdateYear(year);
    }

    @Override
    public Year getYearById(int id) {
        return this.yearRepository.getYearById(id);
    }

    @Override
    public void deleteYear(int id) {
        this.yearRepository.deleteYear(id);
    }
}
