package com.example.controller;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.ProductAddDto;
import com.example.entity.Product;
import com.example.exception.UserException;
import com.example.service.ProductServiceImple;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "*")
public class ProductController {

	@Autowired
	private ProductServiceImple productService;
	
	
	@PostMapping("/add-product")
	public boolean addProduct(ProductAddDto product) throws FileNotFoundException, IOException {
		
		Product p = new Product();
		System.out.println(product.getId());
		
		try {
			p.setName(product.getName());
			p.setBrand(product.getBrand());
			p.setCategory(product.getCategory());
			p.setMetal(product.getMetal());
			p.setGender(product.getGender());
			p.setPrice(product.getPrice());
			p.setDescription(product.getDescription());
			p.setQuantity(product.getQuantity());
			p.setStatus("Added");
			
			p = productService.addProduct(p);
			
			String fileName = p.getProductId() + "-" + product.getProductImg().getOriginalFilename();
			
			FileCopyUtils.copy(product.getProductImg().getInputStream(), new FileOutputStream("C:/Final Project/shringar/src/Product-Images/"+fileName));
		//	FileCopyUtils.copy(product.getProductImg().getInputStream(), new FileOutputStream("C:\\Final Project\\shringar\\src\\Product-Images"+fileName));
			
			p.setProductImg(fileName);
			
			p = productService.addProduct(p);
			
						
		} catch (UserException e) {
			throw new UserException("Sorry there is error in adding products");
		}
		return true;
	}
	
	@PostMapping("/update-product")
	public boolean updateProduct(ProductAddDto product) throws FileNotFoundException, IOException {
		
		Product p = new Product();
		System.out.println(product.getId());
		
		try {
			p.setName(product.getName());
			p.setBrand(product.getBrand());
			p.setCategory(product.getCategory());
			p.setMetal(product.getMetal());
			p.setGender(product.getGender());
			p.setPrice(product.getPrice());
			p.setDescription(product.getDescription());
			p.setQuantity(product.getQuantity());
			p.setProductId(product.getId());
			p.setStatus("Added");
			
			p = productService.updateProduct(p);
			
			String fileName = p.getProductId() + "--" + product.getProductImg().getOriginalFilename();
			
			FileCopyUtils.copy(product.getProductImg().getInputStream(), new FileOutputStream("C:/Final Project/shringar/src/Product-Images/"+fileName));
		//	FileCopyUtils.copy(product.getProductImg().getInputStream(), new FileOutputStream("C:\\Final Project\\shringar\\src\\Product-Images"+fileName));
			
			p.setProductImg(fileName);
			
			p = productService.updateProduct(p);
			
						
		} catch (UserException e) {
			throw new UserException("Sorry there is error in adding products");
		}
		return true;
	}
	
	@GetMapping("/all-products")
	public List<Product> fetchAllProduct(){
		
		try {
			return productService.getAllProducts();
		} catch (Exception e) {
			return null;
		}
	}
	
	@PutMapping("/delete-product/{id}")
	public boolean deleteproduct(@PathVariable int id) {
		try {
		
			return productService.deleteProduct(id); 
		}
		catch(UserException e) {
			return false;
		}
	}
}
