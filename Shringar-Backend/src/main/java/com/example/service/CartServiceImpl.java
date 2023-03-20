package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Cart;
import com.example.exception.UserException;
import com.example.repository.GenericCartRepository;
import com.example.repository.GenericUserRepository;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	private GenericCartRepository cartRepo;
	
	@Autowired
	private GenericUserRepository genUserRepo;

	public Cart addUserCart(Cart c) {
		try {
			
			return cartRepo.save(c);
		}
		catch(Exception e) {
			throw new UserException("Cart not added");
		}
	}
	
	public int getCartId(int uid) throws Exception {
		try {
			
			return cartRepo.findByUser(genUserRepo.findById(uid).get()).getCartId();
			
		}catch(Exception e){
			throw e;
		}
	}
	
}


