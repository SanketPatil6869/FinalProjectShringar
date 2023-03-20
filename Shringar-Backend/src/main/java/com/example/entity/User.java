package com.example.entity;



import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name = "user_table")
public class User {
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int userId, Role role, String email, String password, String first_name, String last_name,
			String mobile, String image, Timestamp creationTimestamp, Timestamp updationTimestamp, String status,
			List<UserAddress> address, List<Cart> cart, List<PaymentDetails> payments) {
		super();
		this.userId = userId;
		this.role = role;
		this.email = email;
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.mobile = mobile;
		this.image = image;
		this.creationTimestamp = creationTimestamp;
		this.updationTimestamp = updationTimestamp;
		this.status = status;
		this.address = address;
		this.cart = cart;
		this.payments = payments;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	
	@ManyToOne
	@JoinColumn(name = "roleId" )
	private Role role;
	
	@Column(unique=true)
	private String email;
	private String password;
	private String first_name;
	private String last_name;
	
	@Column(unique=true)
	private String mobile;
	private String image;
	
	@CreationTimestamp
	private Timestamp creationTimestamp;
	
	@UpdateTimestamp
   // @ColumnDefault("CURRENT_TIMESTAMP")
	private Timestamp updationTimestamp;
	
	private String status;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<UserAddress> address;
	
	@OneToMany(mappedBy="user")
	@JsonIgnore
	private List<Cart> cart;
	
	@OneToMany(mappedBy="user")
	private List<PaymentDetails> payments;

	public List<PaymentDetails> getPayments() {
		return payments;
	}

	public void setPayments(List<PaymentDetails> payments) {
		this.payments = payments;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public List<UserAddress> getAddress() {
		return address;
	}

	public void setAddress(List<UserAddress> address) {
		this.address = address;
	}

	public List<Cart> getCart() {
		return cart;
	}

	public void setCart(List<Cart> cart) {
		this.cart = cart;
	}

	public Timestamp getCreationTimestamp() {
		return creationTimestamp;
	}

	public void setCreationTimestamp(Timestamp creationTimestamp) {
		this.creationTimestamp = creationTimestamp;
	}

	public Timestamp getUpdationTimestamp() {
		return updationTimestamp;
	}

	public void setUpdationTimestamp(Timestamp updationTimestamp) {
		this.updationTimestamp = updationTimestamp;
	}
	

	
}
