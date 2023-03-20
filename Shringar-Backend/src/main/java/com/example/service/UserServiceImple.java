package com.example.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.dto.CartProductsRequestDto;
import com.example.dto.CartProductsResponseDto;
import com.example.dto.ForgotPassDto;
import com.example.dto.UserAddressDto;
import com.example.dto.UserAddressRequestDto;
import com.example.dto.UserLoginDto;
import com.example.dto.UserProductDeleteRequestDto;
import com.example.dto.UserProductUpdateRequestDto;
import com.example.dto.UserProfileDto;
import com.example.dto.UserProfileInfoDto;
import com.example.entity.Cart;
import com.example.entity.Product;
import com.example.entity.User;
import com.example.entity.UserAddress;
import com.example.entity.UserProducts;
import com.example.exception.UserAlreadyPresent;
import com.example.exception.UserException;
import com.example.exception.UserRegistrationException;
import com.example.repository.GenericAddressRepo;
import com.example.repository.GenericCartRepository;
import com.example.repository.GenericProductRepository;
import com.example.repository.GenericUserProductRepo;
import com.example.repository.GenericUserRepository;

@Service
@Transactional
public class UserServiceImple implements UserService{
	
	@Autowired
	private GenericUserRepository genUserRepo;
	
	@Autowired
	private GenericAddressRepo genAddressRepo;
	
	@Autowired
	private GenericCartRepository genCartRepo;
	
	@Autowired
	private GenericProductRepository genProductRepo;
	
	@Autowired
	private GenericUserProductRepo genUserProductRepo;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncode;

	public User addUser(User u) {
		
		String pass = passwordEncode.encode(u.getPassword());
		
		u.setPassword(pass);
		
		return genUserRepo.save(u);
		
	}
	
	@Override
	public User getByEmail(String email) {
		
		return genUserRepo.findByEmail(email);
	}

	public List<User> getAllUserList() {
		
		return genUserRepo.findAll();
	}

	public boolean addAddress(UserAddressRequestDto userAddress) {
		
		try {
			UserAddress uAdd = new UserAddress();
			//System.out.println(userAddress.isDefault());
			UserAddress ua = genAddressRepo.findByUserAndAddLine1AndAddLine2AndCity(
					genUserRepo.findById(userAddress.getUid()).get(), userAddress.getAddress1(),
					userAddress.getAddress2(), userAddress.getCity());

			if (ua != null) {
				return false;
			}

			if (userAddress.isDefault()) {
				UserAddress uadd = genAddressRepo.findByIsDefault(true);
				System.out.println(uadd);
				if (uadd != null) {
					uadd.setDefault(false);
					genAddressRepo.save(uadd);
					uAdd.setAddLine1(userAddress.getAddress1());
					uAdd.setAddLine2(userAddress.getAddress2());
					uAdd.setCity(userAddress.getCity());
					uAdd.setCountry(userAddress.getCountry());
					uAdd.setFname(userAddress.getFirstName());
					uAdd.setLname(userAddress.getLastName());
					uAdd.setPostalCode(userAddress.getZip());
					uAdd.setState(userAddress.getState());
					uAdd.setUser(genUserRepo.findById(userAddress.getUid()).get());
					uAdd.setDefault(true); 
					genAddressRepo.save(uAdd);
				} else {
					uAdd.setAddLine1(userAddress.getAddress1());
					uAdd.setAddLine2(userAddress.getAddress2());
					uAdd.setCity(userAddress.getCity());
					uAdd.setCountry(userAddress.getCountry());
					uAdd.setFname(userAddress.getFirstName());
					uAdd.setLname(userAddress.getLastName());
					uAdd.setPostalCode(userAddress.getZip());
					uAdd.setState(userAddress.getState());
					uAdd.setUser(genUserRepo.findById(userAddress.getUid()).get());
					uAdd.setDefault(true);
					genAddressRepo.save(uAdd);
				}
			} else {

				uAdd.setAddLine1(userAddress.getAddress1());
				uAdd.setAddLine2(userAddress.getAddress2());
				uAdd.setCity(userAddress.getCity());
				uAdd.setCountry(userAddress.getCountry());
				uAdd.setFname(userAddress.getFirstName());
				uAdd.setLname(userAddress.getLastName());
				uAdd.setPostalCode(userAddress.getZip());
				uAdd.setState(userAddress.getState());
				uAdd.setUser(genUserRepo.findById(userAddress.getUid()).get());
				uAdd.setDefault(false);
				genAddressRepo.save(uAdd);
			}

			return true;

		} catch (Exception e) {
			//throw e;
			return false;
		}
		
		
	} 

	public UserLoginDto authenticateUser(UserLoginDto uld) {
		User u = null;
		uld.setPassword(uld.getPassword());
		//System.out.println("=======================");
		//System.out.println(uld.getPassword());
		UserLoginDto userDetails = new UserLoginDto();
		
		try {
			if((u = genUserRepo.findByEmailAndPassword(uld.getEmail(), uld.getPassword())) != null) {
				userDetails.setRole(u.getRole());
				userDetails.setUserId(u.getUserId());
				userDetails.setStatus(true);
				userDetails.setUserImg(u.getImage());
				return userDetails;
			}else {
				throw new UserException("User Not found!! Please try again.");
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw new UserException("User Not found!! Please try again.");
		}
		
	}
	
	public UserProfileDto getUserProfileInfo(int id) {
		
		try {
			UserProfileDto upd =  genUserRepo.getUserProfileInfo(id);
			System.out.println(upd.getAddressLine1());
			return upd;
		} catch (Exception e) {
			throw new UserException("User Details not found");

		}
	}
	
	public User getUserById(int id) {

		try {
			return genUserRepo.findById(id).get();
		} catch (Exception e) {
			System.out.println(id);
			e.printStackTrace();
			throw new UserException("User with id not found");
		}

	}
	
	public boolean changePassword (ForgotPassDto dto) {
		
		String pass = passwordEncode.encode(dto.getPassword());
		
		System.out.println("pass "+pass);
		System.out.println(dto.getEmail());
		try {
			genUserRepo.ChangePassFromEmail(dto.getEmail(), pass);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public UserProducts addtoCartProduct(CartProductsRequestDto p) {
		UserProducts cartProduct;
		//try {
			User u = getUserById(p.getUserid());
			//System.out.println("==================================");
			//System.out.println(p.getUserid());
			//System.out.println(p.getProductid());
			Cart c = genCartRepo.findByUser(u);
			
			cartProduct = new UserProducts();
			
			cartProduct.setCart(c);
			cartProduct.setMetal(p.getMetal());
			cartProduct.setSize(p.getSize());
			Product product = genProductRepo.findById(p.getProductid()).get();
			String visibility = "Pending";
			UserProducts up = genUserProductRepo.findByProductAndCartAndVisiblity(product, c, visibility);
			
			if(up == null) {
				cartProduct.setProduct(product);
			}
			cartProduct.setQuantity(p.getQuantity());
			cartProduct.setVisiblity(p.getStatus());
			
			return genUserProductRepo.save(cartProduct);
		//}
//		catch (UserAlreadyPresent e) {
//			e.printStackTrace();
//			throw new UserAlreadyPresent("User is already present");
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw new UserException("Cart");
//		}
	}
	
	public boolean updateUserCartProducts(int cid) {

		try {
			genUserProductRepo.updateCartProductsVisiblity(genCartRepo.findById(cid).get());
			return true;

		} catch (Exception e) {
			throw e;
		}
	}

	public boolean userProfileUpdate(UserProfileInfoDto upid) {
		
			User u = genUserRepo.findById(upid.getUserId()).get();
			
			u.setFirst_name(upid.getFirstName());
			u.setLast_name(upid.getLastName());
			u.setMobile(upid.getMobile());
			
			if (genUserRepo.save(u) != null)
				return true;
			return false;

	}
	
	public boolean updateAddress(UserAddressDto uAdd) {

		try {
			//System.out.println("in user Imple");
			//System.out.println(uAdd.getAddId());
			UserAddress userAdd = genAddressRepo.findById(uAdd.getAddId()).get();
			//System.out.println(userAdd);

			userAdd.setAddLine1(uAdd.getAddLine1());
			userAdd.setAddLine2(uAdd.getAddLine2());
			userAdd.setCity(uAdd.getCity());
			userAdd.setCountry(uAdd.getCountry());
			userAdd.setPostalCode(uAdd.getPostalCode());
			userAdd.setState(uAdd.getState());
			//System.out.println(userAdd);
			if (genAddressRepo.save(userAdd) != null)
				return true;
			else
				return false;
		} catch (Exception e) {
			throw new UserException("Address not updated");
		}
	}

	public CartProductsRequestDto getCartItemQuentity(int cartId) {
		CartProductsRequestDto dto = null;
		
	//	try {
			dto = new CartProductsRequestDto();
			dto.setQuantity(genUserProductRepo.getProductCartQuantity(cartId));
			dto.setStatus("Success");
			return dto;
			
//		} catch (Exception e) {
//			dto = new CartProductsRequestDto();
//			dto.setQuantity(0);
//			dto.setStatus("fail");
//			return dto;
//		}
		
	}

	public List<CartProductsResponseDto> getAllCartProducts(int cartId) throws Exception {

		try {
			List<CartProductsResponseDto> product = new ArrayList<CartProductsResponseDto>();
			List<UserProducts> up = genUserProductRepo.findAllProductsWhereVisiblityIsPendingAndCartIdIsPresent(genCartRepo.findById(cartId).get());
			for (UserProducts x : up) {

				CartProductsResponseDto cp = new CartProductsResponseDto();

				cp.setBrand(x.getProduct().getBrand());
				cp.setMetal(x.getMetal());
				cp.setName(x.getProduct().getName());
				cp.setPrice(x.getProduct().getPrice());
				cp.setProductId(x.getProduct().getProductId());
				cp.setProductImg(x.getProduct().getProductImg());
				cp.setQuantity(x.getQuantity());
				cp.setSize(x.getSize());
				product.add(cp);
			}

			System.out.println(up);
			return product;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public boolean updateUserProductQuantityByadd1(UserProductUpdateRequestDto updto) throws Exception {

		try {
			genUserProductRepo.updateUserProductQuantityByplus1(updto.getQuantity(), updto.getUserCartId(),
					updto.getProductId());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

	public boolean updateUserProductQuantityBySub1(UserProductUpdateRequestDto updto) throws Exception {

		try {
			genUserProductRepo.updateUserProductQuantityByminus1(updto.getQuantity(), updto.getUserCartId(),
					updto.getProductId());
			return true;

		} catch (Exception e) {
			throw e;
		}
	}
	
	public boolean deleteProductFromTheCart(UserProductDeleteRequestDto delprod) throws Exception {
		try {
			genUserProductRepo.deleteProductFromCart(delprod.getProductId(), delprod.getUserCartId());
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
	}
	
	public Boolean clearCart(int cartId) throws Exception {

		try {
			genUserProductRepo.deleteCart(genCartRepo.findById(cartId).get());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	
	
}
