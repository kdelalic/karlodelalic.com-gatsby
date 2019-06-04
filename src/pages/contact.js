import React from "react"
import { FaRegFilePdf, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import { withPrefix } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./contact.scss"

const ContactPage = () => (
  <Layout title="Contact">
    <SEO title="Contact" keywords={[`karlo delalic`, `portfolio`, `fullstack developer`, `software engineer`, `react`]} />
    <div className="contact">
      <a className="contact__email" href="mailto:karlo.delalic1@gmail.com" target="_blank" rel="noopener noreferrer">karlo.delalic1@gmail.com</a>
      <div className="contact__buttons">
        <a className="link-button ghost" href="https://linkedin.com/in/kdelalic/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> Linkedin</a>
        <a className="link-button ghost" href="https://twitter.com/karlodelalic/" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
        <a className="link-button ghost" href="https://github.com/kdelalic/" target="_blank" rel="noopener noreferrer"><FaGithub /> Github</a>
      </div>
      <a className="link-button primary" href={withPrefix('/resume.pdf')} target="_blank" rel="noopener noreferrer"><FaRegFilePdf />Resume</a>
    </div>
  </Layout>
)

export default ContactPage
