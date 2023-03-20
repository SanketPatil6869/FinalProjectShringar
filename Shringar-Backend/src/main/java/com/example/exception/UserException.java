package com.example.exception;

public class UserException extends RuntimeException{
	
	public UserException() {
		
	}
	public UserException(String messg){
		super(messg);
	}

}
