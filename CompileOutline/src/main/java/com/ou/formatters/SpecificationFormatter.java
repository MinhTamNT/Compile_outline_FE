package com.ou.formatters;

import com.ou.pojo.Specification;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;

public class SpecificationFormatter implements Formatter<Specification> {
    @Override
    public Specification parse(String id, Locale locale) throws ParseException {
        Specification specification = new Specification();
        specification.setId(Integer.parseInt(id));
        return specification;
    }

    @Override
    public String print(Specification specification, Locale locale) {
        return String.valueOf(specification.getId());
    }

}
