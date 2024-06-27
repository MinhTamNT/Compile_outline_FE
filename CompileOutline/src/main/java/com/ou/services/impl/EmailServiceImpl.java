package com.ou.services.impl;

import com.ou.pojo.User;
import com.ou.services.EmailService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@PropertySource("classpath:mail.properties")
public class EmailServiceImpl implements EmailService {
    @Autowired
    private Environment environment;
    @Override
    public void sendAccountCreationEmail(User recipient) throws IOException {
        Email from = new Email(environment.getProperty("form_key"));
        Email to = new Email(recipient.getProfile().getEmail());
        String subject = "Your Student account has been created, login and change your password!!!";
        Content content = new Content("text/plain", String.format("username: %s\npassword: 123\nYou must change password and avatar", recipient.getUsername()));
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(environment.getProperty("key"));
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());

        } catch(IOException ex) {
            throw ex;
        }
    }
}
