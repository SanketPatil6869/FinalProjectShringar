package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.config.UserDetailServiceImple;
import com.example.entity.JwtRequest;
import com.example.entity.JwtResponse;
import com.example.entity.User;
import com.example.helper.JwtUtil;
import com.example.repository.GenericUserRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.POST , RequestMethod.GET , RequestMethod.DELETE , RequestMethod.PUT},allowedHeaders = "*")
public class JwtController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailServiceImple userDetailServiceImpl;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private GenericUserRepository GenUserRepo;
	
	@PostMapping("/login")
	public ResponseEntity<?> generateToken(@RequestBody  JwtRequest request) throws Exception{
		
		try {
		
			UserDetails userDetails = this.userDetailServiceImpl.loadUserByUsername(request.getEmail());
			
		
			
			String token = this.jwtUtil.generateToken(userDetails);
			
			System.out.println("JWT "+token);
			
			Authentication auth = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
	
			User u = GenUserRepo.findByEmail(request.getEmail());
			

			System.out.println("Role ; "+u.getRole());
			
			JwtResponse response = new JwtResponse();
			response.setToken(token);
			response.setRole(u.getRole());
			response.setUserId(u.getUserId());
			
			System.out.println("Role ID "+response.getRole() );
					
			return ResponseEntity.ok(response);
			
		} catch (UsernameNotFoundException e) {
			
			System.out.print("exception" + e);
			e.printStackTrace();

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		catch(BadCredentialsException e) {
			throw new Exception("Bad Credentials!!!");
		}
	}

}
