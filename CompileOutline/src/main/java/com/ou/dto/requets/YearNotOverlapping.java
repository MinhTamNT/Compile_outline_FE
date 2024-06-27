package com.ou.dto.requets;


import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = YearNotOverlappingValidator.class)
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface YearNotOverlapping {
    String message() default "The specification for the selected year already exists.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
