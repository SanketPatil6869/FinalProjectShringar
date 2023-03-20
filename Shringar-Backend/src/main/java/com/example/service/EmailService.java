package com.example.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender emailsend;
	
	public int sendEmailForOTP(String email) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
		
		Random random = new Random();
		
		int otp = random.nextInt(100000,999999);
		
		msg.setFrom("sanket95951616@gmail.com");
		
		msg.setTo(email);
		
		msg.setSubject("OTP CONFIRMATION FOR SHRINGAR");
		
		msg.setText("OTP :"+otp);
		
		emailsend.send(msg);
		
		return otp;
	}
}
