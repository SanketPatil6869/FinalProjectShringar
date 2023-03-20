package com.example.service;

import java.util.List;

import com.example.dto.CartProductsRequestDto;
import com.example.dto.CartProductsResponseDto;
import com.example.dto.UserAddressRequestDto;
import com.example.dto.UserLoginDto;
import com.example.dto.UserProductDeleteRequestDto;
import com.example.dto.UserProductUpdateRequestDto;
import com.example.dto.UserProfileDto;
import com.example.dto.UserProfileInfoDto;
import com.example.dto.UserLoginDto;
import com.example.entity.User;
import com.example.entity.UserProducts;

public interface UserService {
	
	public User addUser(User u);
	
	public List<User> getAllUserList();
	
	public UserLoginDto authenticateUser(UserLoginDto uld);
	
	public boolean addAddress(UserAddressRequestDto userAddress);
	
	public UserProfileDto getUserProfileInfo(int id);
	
	public UserProducts addtoCartProduct (CartProductsRequestDto p);
	
	public boolean userProfileUpdate(UserProfileInfoDto upid);
	
	public CartProductsRequestDto getCartItemQuentity(int cartId);
	
	public List<CartProductsResponseDto> getAllCartProducts(int cartid) throws Exception;
	
	public boolean updateUserProductQuantityByadd1(UserProductUpdateRequestDto updto) throws Exception;
	
	public boolean updateUserProductQuantityBySub1(UserProductUpdateRequestDto updto) throws Exception;
	
	public boolean deleteProductFromTheCart(UserProductDeleteRequestDto delprod) throws Exception;
	
	public Boolean clearCart(int cartId) throws Exception;
	
	public User getByEmail(String email);

}
