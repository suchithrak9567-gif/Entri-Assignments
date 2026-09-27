import { ArrowRight, Heart, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-page container">
      <div className="contact-intro">
        <span className="eyebrow"><Heart size={14} /> People make the place</span>
        <h1>We’re all <em>ears.</em></h1>
        <p>A question, a kind word, an idea for something we should stock? We’d genuinely love to hear from you.</p>
        <div className="contact-details">
          <a href="mailto:hello@shopnest.example"><Mail size={17} /> hello@shopnest.example</a>
          <span><MessageCircle size={17} /> Usually here, Monday–Friday</span>
          <span><MapPin size={17} /> A little corner of the internet</span>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <span className="eyebrow">Drop us a note</span>
        <h2>{submitted ? "Your note is with us." : "What’s on your mind?"}</h2>
        {submitted ? (
          <div className="form-success" role="status">
            <span className="success-icon"><Heart size={19} fill="currentColor" /></span>
            <p>Thanks for reaching out! We’ll be in touch as soon as we can.</p>
            <button className="text-button" onClick={() => setSubmitted(false)} type="button">Send another note</button>
          </div>
        ) : (
          <>
            <label>Your name<input autoComplete="name" name="name" placeholder="What should we call you?" required /></label>
            <label>Email address<input autoComplete="email" name="email" placeholder="you@example.com" required type="email" /></label>
            <label>Your note<textarea name="message" placeholder="Tell us a little something..." required rows="4" /></label>
            <button className="button button-dark" type="submit">Send your note <ArrowRight size={16} /></button>
            <p className="form-disclaimer">This demo form doesn’t send information to a server just yet.</p>
          </>
        )}
      </form>
    </section>
  );
}

export default ContactPage;
