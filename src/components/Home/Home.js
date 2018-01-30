import React, { Component } from 'react'

import './home.scss'

const Home = class Home extends Component {
  render () {
    return (
      <div styleName='container'>
        <h2>Work Experience</h2>
        <hr />

        <h4>Software Engineer</h4>
        <h5>JLM Energy, Inc.</h5>
        <p>Jul 2016 – Present Employment - 1 yr 7 mos</p>
        <p>Rocklin, California</p>
        <ul>
          <li>
            Ported existing web based mobile application to React Native /
            Redux.
          </li>
          <li>
            Designed and implemented continuous integration protocol for mobile
            application development.
          </li>
          <li>
            Collaborated with hardware team and field technicians to develop
            device setup and networking screens for mobile.
          </li>
          <li>
            Developed custom networking module for both iOS & Android platforms.
          </li>
          <li>
            Developed data extraction utility to enable hardware engineers to
            view and analyze cloud device data.
          </li>
        </ul>

        <hr />

        <h4>Software Engineering Manager</h4>
        <h5>JLM Energy, Inc.</h5>
        <p>Nov 2014 – Jan 2016 Employment - 1 yr 3 mos</p>
        <p>Rocklin, CA</p>
        <ul>
          <li>
            Developed local and cloud based software to display data from power
            meters, battery management systems, battery charging systems and
            power inverters.
          </li>
          <li>
            Interfaced directly with ACUVIM II hardware to set configurations
            and retrieve device data.
          </li>
          <li>
            Developed back-end functionality for energy management and home
            automation applications.
          </li>
          <li>
            Engineered cloud database schema to allow for greater scalability
            and much improved data retrieval efficiency.
          </li>
          <li>
            Developed data monitoring services for three flagship products.
          </li>
          <li>
            Developed the company’s first public facing data API while leading
            the software team through it’s development and completion.
          </li>
          <li>
            Hired and managed several new developers to assist in the
            maintenance and creation of new software.
          </li>
          <li>
            Implemented fundamental Agile practices and software into the team’s
            development workflow.
          </li>
          <li>
            Lead software team through the re-engineering of all cloud based
            software to rely on API data calls instead of PostgreSQL queries.
          </li>
          <li>
            Migrated cloud monitoring and energy management services to Amazon,
            resulting in improved security, redundancy, scalability and
            reliability.
          </li>
          <li>
            Advised marketing department on how to achieve e-commerce and dealer
            portal technology goals.
          </li>
          <li>
            Created and implemented several company policies regarding safe
            development practices, data collection, and communication security.
          </li>
        </ul>

        <hr />

        <h4>Lead Developer</h4>
        <h5>I-Tul Design & Software, Inc.</h5>
        <p>May 2014 – Nov 2014 Employment - 7 mos</p>
        <p>Roseville, CA</p>
        <ul>
          <li>
            Developed plugins to expand WordPress platform for customer specific
            needs.
          </li>
          <li>
            Worked with graphic designers to turn Adobe designs into WordPress
            templates.
          </li>
          <li>
            Answered level II support tickets regarding custom database and
            development issues.
          </li>
          <li>
            Developed custom content management systems using the i-Tul PHP
            framework for medical and financial clients.
          </li>
          <li>
            Communicated with high profile clients on a daily basis to inform of
            progress and solve web related issues.
          </li>
        </ul>
      </div>
    )
  }
}

export default Home
