import React from "react";
import "../styles/Hero.css";
import heroImage from "../assets/heroImage.jpg";

const Hero = () => {
	return (
		<section className="hero">
			<div className="hero-content">
				<div className="hero-text">
					<h1>Explore Ideas. Share Knowledge. Empower Minds.</h1>
					<p>
						A modern platform to publish, discover, and connect through
						meaningful posts.
					</p>
				</div>
				<img src={heroImage} alt="Image of people brainstorming ideas." />
			</div>

			<div className="cta-buttons">
				<a href="/signup" class="btn">
					Get Started
				</a>
				<a href="/posts" class="btn secondary">
					Browse Posts
				</a>
			</div>
		</section>
	);
};

export default Hero;
