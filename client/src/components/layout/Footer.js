import React, { Component } from 'react'
import '../../styles/Footer.css'

class Footer extends Component {

    render() {
        return (
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                    <div className="col s6 col md3">
                        <h6>About BUVSA</h6>
                        <p className="text-justify"> <i> Boston University’s Vietnamese Student Association (BUVSA)  </i>  is a student-run organization at Boston University that provides an opportunity for exploring, sharing, and preserving Vietnamese history, culture, and experiences. It also promotes friendship and awareness both among club members and within the Boston University campus. </p>
                    </div>

                    <div className="col s3 col md3">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                        <li><a href="http://scanfcode.com/category/c-language/">ACE</a></li>
                        <li><a href="http://scanfcode.com/category/front-end-development/">Culture Show</a></li>
                        <li><a href="http://scanfcode.com/category/back-end-development/">Events</a></li>
                        <li><a href="http://scanfcode.com/category/java-programming-language/">Executive Board</a></li>
                        </ul>
                    </div>

                    <div className="col s3 col md3">
                        <h6>Quick Links</h6>
                        <ul className="footer-links">
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/contribute">Contribute</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/sitemap">Sitemap</a></li>
                        </ul>
                    </div>
                    
                    </div>
                    <div className="row">
                        <div className="col s12 col sm6 col xs12">
                            <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by 
                                <a href="https://tintheturtle.github.io/personal-website/"> Tin Nguyen</a>.
                            </p>
                        </div>

                        <div className="col s12 col sm6 col xs12">
                            <ul className="social-icons">
                                <li><a className="facebook" href="https://www.facebook.com/buvsa/"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="twitter" href="https://www.facebook.com/buvsa/"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="dribbble" href="https://www.facebook.com/buvsa/"><i className="fa fa-dribbble"></i></a></li>
                                <li><a className="linkedin" href="https://www.facebook.com/buvsa/"><i className="fa fa-linkedin"></i></a></li>   
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer