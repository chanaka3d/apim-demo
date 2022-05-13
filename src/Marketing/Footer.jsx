import React from 'react'
import './Footer.css';
import { Container } from '@material-ui/core';

export default function Footer() {
  return (
      
    <footer className="footer-distributed">
            <Container maxWidth="lg">
			<div className="footer-left">
				<h3><img src='/logo-footer.svg' width={300} /></h3>
				<p className="footer-links">
					<a href="#" className="link-1">Home</a>
					<a href="#">Blog</a>
					<a href="#">Pricing</a>
					<a href="#">About</a>
					<a href="#">Faq</a>
					<a href="#">Contact</a>
				</p>
				<p className="footer-company-name">Company Name © 2022</p>
			</div>
			<div className="footer-center">
				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>4956 Commerce Boulevard</span> Omaha, Nebraska</p>
				</div>
				<div>
					<i className="fa fa-phone"></i>
					<p>402-544-5481</p>
				</div>
				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>
			</div>
			<div className="footer-right">
				<p className="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>
				<div className="footer-icons">
					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-github"></i></a>
				</div>
			</div>
        </Container>
		</footer>
  )
}
