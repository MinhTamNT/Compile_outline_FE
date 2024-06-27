package com.ou.formatters;

import com.ou.pojo.Year;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class YearFormatter implements Formatter<Year> {
    @Override
    public Year parse(String id, Locale locale) throws ParseException {
        Year year = new Year();
        year.setId(Integer.parseInt(id));
        return year;
    }

    @Override
    public String print(Year year, Locale locale) {
        return String.valueOf(year.getId());
    }
}
