package com.example.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.helper.JwtUtil;

@Component
public class JwtAuthFilter extends OncePerRequestFilter{
	
	@Autowired
	private UserDetailServiceImple userDetailServiceImpl;
	
	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String requestHeaderToken = request.getHeader("Authorization");
		String username = null;
		String jwtToken = null;
	
	
	if(requestHeaderToken != null && requestHeaderToken.startsWith("Bearer ")) {
		
		jwtToken = requestHeaderToken.substring(7);
		try {
			
			username = this.jwtUtil.extractUsername(jwtToken);
			//System.out.print(username);
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		UserDetails userDetails = this.userDetailServiceImpl.loadUserByUsername(username);
		
		if(username != null && SecurityContextHolder.getContext().getAuthentication()==null ) {
			
			UsernamePasswordAuthenticationToken userToken = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
			userToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			SecurityContextHolder.getContext().setAuthentication(userToken);
		}
		
	}
	
	filterChain.doFilter(request, response);
}

}
