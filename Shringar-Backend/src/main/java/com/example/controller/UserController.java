package com.example.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.CartProductsRequestDto;
import com.example.dto.CartProductsResponseDto;
import com.example.dto.ForgotPassDto;
import com.example.dto.OtpVerify;
import com.example.dto.UserAddressDto;
import com.example.dto.UserAddressRequestDto;
import com.example.dto.UserLoginDto;
import com.example.dto.UserProductDeleteRequestDto;
import com.example.dto.UserProductUpdateRequestDto;
import com.example.dto.UserProfileDto;
import com.example.dto.UserProfileInfoDto;
import com.example.entity.Cart;
import com.example.entity.Role;
import com.example.entity.User;
import com.example.exception.UserAlreadyPresent;
import com.example.exception.UserException;
import com.example.exception.UserRegistrationException;
import com.example.service.CartServiceImpl;
import com.example.service.EmailService;
import com.example.service.UserServiceImple;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT},allowedHeaders = "*")
public class UserController {
	
	@Autowired
	private UserServiceImple userServ;
	
	@Autowired
	private CartServiceImpl cartServ;
	
	@Autowired
	private EmailService emailService;
	
	
	Map<String, Integer> userOtpSession = new HashMap<String, Integer>();

	@PostMapping("/register")
	public boolean RegisterUser(@RequestBody User u) {
		
		Role r = new Role(1, "user");
		u.setRole(r);

		try {
			
			u.setStatus("Active");

			User newUser = userServ.addUser(u);

			Cart c = new Cart();

			c.setUser(newUser);

			cartServ.addUserCart(c);
 
		} catch (UserRegistrationException e) {

			return false;
		}

		return true;
							
	}
	
	@GetMapping("/userInfo")
	public ResponseEntity<?> userInfo (Principal user){
		
		User u = userServ.getByEmail(user.getName());
		System.out.println("objfrtd"+u.toString());
		System.out.println("hkgh"+user.getName());
		return ResponseEntity.ok(u);
	}
	
	@PostMapping("/getUsers")
	public List<User> findAllUserList() {
		
		return userServ.getAllUserList();
	}
	
	@PostMapping("/add-User-Address")
	public boolean addUserAddress(@RequestBody UserAddressRequestDto userAdd) {
		
		return userServ.addAddress(userAdd);
	}  
	

	@GetMapping("/send-OTP/{email}")
	public boolean sendOtp(@PathVariable String email) {

		try {
			//System.out.println(email);

			int otp = emailService.sendEmailForOTP(email);

			//System.out.println(otp);

			userOtpSession.put(email, otp);

			System.out.println(userOtpSession.get(email));

		} catch (Exception e) {
			e.printStackTrace();
			throw new UserException("Otp sending error");
		}

		return true;
	}
	
	@PostMapping("/verify-OTP")
	public boolean verifyOtp(@RequestBody OtpVerify otpBody) {
		System.out.println(otpBody.getEmail());
		System.out.println(userOtpSession.get(otpBody.getEmail()));
		try {
			if (userOtpSession.get(otpBody.getEmail()).equals(otpBody.getOtp())) {

				return true;

			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new UserException("Otp veryfing error");
		}

		return false;
	}
	
	@PostMapping("/change-pass")
	public boolean ForgotPass(@RequestBody ForgotPassDto body) {
		
	//	System.out.println(body.getEmail());
		
		try {
			ForgotPassDto dto = new ForgotPassDto();
			dto.setEmail(body.getEmail());
			dto.setPassword(body.getPassword());
			//System.out.println(dto.getPassword());
			//System.out.println(dto.getEmail());
			
			return userServ.changePassword(dto);
			
		} catch (Exception e) {
			return false;
		}
			
	}
	
	@GetMapping("/user-profile-info/{userId}")
	public UserProfileDto getUserProfileInfo(@PathVariable int userId) {
		try {
			return userServ.getUserProfileInfo(userId);
		} catch (UserException e) {
			throw e;
		}
	}
	
	@PostMapping("/add-product-cart")
	public boolean addToCart(@RequestBody CartProductsRequestDto cartProduct) {
		
		try {
			userServ.addtoCartProduct(cartProduct);
		}catch(UserAlreadyPresent e){
			e.printStackTrace();
			throw new UserAlreadyPresent("User is already present");
		}
		
		return true;
	}
	
	@GetMapping("/update-User-Cart-checkout/{cid}")
	public boolean updateCartAfterCheckout(@PathVariable int cid) {

		try {
			userServ.updateUserCartProducts(cid);
			return true;
		} catch (Exception e) {
			throw e;
		}
	}
	
	@PutMapping("/update-user-address")
	public boolean updateUserAddress(@RequestBody UserAddressDto uAdd) {
		try {

			return userServ.updateAddress(uAdd);
		} catch (UserException e) {
			return false;
		}
	}

	@PutMapping("/update-user-info")
	public boolean userInfoUpdate(@RequestBody UserProfileInfoDto userDto) {
		try {
			System.out.println(userDto);
			return userServ.userProfileUpdate(userDto);
		} catch (UserException e) {
			return false;
		}
	}
	
	@GetMapping("/getCartQuantity/{cartId}")
	public CartProductsRequestDto getCartItemQuantity(@PathVariable int cartId) {
	//	try {
			return userServ.getCartItemQuentity(cartId);
	//	}
		//catch (UserException e) {
		//	throw e;
		//}
	}
	
	@GetMapping("/get-userCart/{uid}")
	public int getUserCartId(@PathVariable int uid) throws Exception {

		try {
			return cartServ.getCartId(uid);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@PostMapping("/get-all-cartProducts/{cartId}")
	public List<CartProductsResponseDto> getCartProducts(@PathVariable int cartId) {

		try {

			return userServ.getAllCartProducts(cartId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new UserException("product are not available in cart");
		}
	}
	
	@PutMapping("/plus-UserProduct")
	public Boolean plusproduct(@RequestBody UserProductUpdateRequestDto productDto) throws Exception {

		try {
			return userServ.updateUserProductQuantityByadd1(productDto);
		} catch (UserException e) {
			return false;
		}
	}

	@PutMapping("/minus-UserProduct")
	public Boolean minusproduct(@RequestBody UserProductUpdateRequestDto productDto) throws Exception {

		try {
			return userServ.updateUserProductQuantityBySub1(productDto);
		} catch (UserException e) {
			return false;
		}
	}

	@PutMapping("/delete-UserProduct")
	public Boolean deleteuserProduct(@RequestBody UserProductDeleteRequestDto productDto) throws Exception {

		try {
			return userServ.deleteProductFromTheCart(productDto);
		} catch (UserException e) {
			return false;
		}
	}
	
	@PutMapping("/clear-cart/{cartId}")
	public Boolean clearUserCart(@PathVariable int cartId) throws Exception {

		try {
			return userServ.clearCart(cartId);

		} catch (Exception e) {
			throw e;
		}
	}
	
}
