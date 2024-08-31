package com.example.rentalride.entities;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="fullname", nullable = false)
    private String fullname;
    
    @Column(name="email", nullable = false)
    private String email;
    
    @Column(name="mobno", nullable = false)
    private String mobno;
    
    @Column(name="password", nullable = false)
    private String password;

    // Default constructor
    public User() {
        super();
    }

    // Parameterized constructor
    public User(Long id, String fullname, String email, String mobno, String password) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.mobno = mobno;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobno() {
        return mobno;
    }

    public void setMobno(String mobno) {
        this.mobno = mobno;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
