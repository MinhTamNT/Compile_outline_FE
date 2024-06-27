package com.ou.repositories;

import com.ou.pojo.Year;

import java.util.List;

public interface YearRepository{
    List<Year> getYears();
    void addOrUpdateYear(Year year);
    Year getYearById(int id);
    Year getYearByYearmame(int yearName);
    void deleteYear(int id);
}
