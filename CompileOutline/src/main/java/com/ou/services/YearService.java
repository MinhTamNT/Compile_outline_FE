package com.ou.services;

import com.ou.pojo.Year;

import java.util.List;

public interface YearService {
    List<Year> getYears();
    void addOrUpdateYear(Year year);
    Year getYearById(int id);
    void deleteYear(int id);
}
