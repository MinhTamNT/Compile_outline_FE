package com.ou.formatters;

import com.ou.pojo.Requirement;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class RequirementFormatter implements Formatter<Requirement> {
    @Override
    public Requirement parse(String id, Locale locale) throws ParseException {
        Requirement r = new Requirement();
        r.setId(Integer.parseInt(id));
        return r;
    }

    @Override
    public String print(Requirement requirement, Locale locale) {
        return String.valueOf(requirement.getId());
    }
}
