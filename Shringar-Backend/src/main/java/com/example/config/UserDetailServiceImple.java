package com.example.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repository.GenericUserRepository;


@Service
public class UserDetailServiceImple implements UserDetailsService{
	
	@Autowired
	private GenericUserRepository genUserRepo;

	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		User user = genUserRepo.findByEmail(email);
		
		if(user != null) {
			return new CustomUser(user);
		}
		else {
			throw new UsernameNotFoundException("user not available");
		}	
	}

}
