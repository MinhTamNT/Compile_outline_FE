package com.ou.services;

import com.ou.pojo.User;

import java.io.IOException;

public interface EmailService {
    void sendAccountCreationEmail(User recipient) throws IOException;
}
