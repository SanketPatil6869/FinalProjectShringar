package com.example.service;

import java.util.List;

import com.example.entity.Product;

public interface ProductService {
	
	public Product addProduct(Product p);

	public List<Product> getAllProducts();

	boolean deleteProduct(int id);
}
