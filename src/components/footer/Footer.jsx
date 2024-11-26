import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';   

const footerStyles = {
  footerArea: {
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
    boxShadow: '0 8px 48px 8px rgba(47, 91, 234, 0.175)',
    padding: '60px',
  },
  row: {
    marginLeft: '-25px',
    marginRight: '-25px',
  },
  col: {
    paddingRight: '25px',
    paddingLeft: '25px',
  },
  widgetTitle: {
    marginBottom: '1.5rem',
  },
  footerMenu: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  footerMenuItem: {
    color: '#747794',
    marginBottom: '1rem',
    display: 'block',
    fontSize: '1rem',
  },
  footerMenuItemHover: {
    color: '#3f43fd',
  },
  socialArea: {
    position: 'relative',
    zIndex: 1,
  },
  socialIcon: {
    borderRadius: '50%',
    height: '40px',
    textAlign: 'center',
    width: '40px',
    display: 'inline-block',
    backgroundColor: '#f5f5ff',
    lineHeight: '40px',
    boxShadow: 'none',
    marginRight: '10px',
  },
};

const Footer = () => {
  return (
    <footer style={footerStyles.footerArea}>
      <div className="container">
        <div className="row" style={footerStyles.row}>
          {/* Widget 1 */}
          <div className="col-12 col-sm-6 col-lg-4" style={footerStyles.col}>
            <div>
              <p>Appland is completely creative, lightweight, clean app landing page.</p>
                        <div style={footerStyles.socialArea}>
                <a href="#" style={footerStyles.socialIcon}>
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" style={footerStyles.socialIcon}>
                  <i className="fa fa-pinterest"></i>
                </a>
                <a href="#" style={footerStyles.socialIcon}>
                  <i className="fa fa-skype"></i>
                </a>
                <a href="#" style={footerStyles.socialIcon}>
                  <i className="fa fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Widget 2 */}
          <div className="col-12 col-sm-6 col-lg" style={footerStyles.col}>
            <h5 style={footerStyles.widgetTitle}>About</h5>
            <ul style={footerStyles.footerMenu}>
              <li><a href="#" style={footerStyles.footerMenuItem}>About Us</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Corporate Sale</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Terms & Policy</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Community</a></li>
            </ul>
          </div>

          {/* Widget 3 */}
          <div className="col-12 col-sm-6 col-lg" style={footerStyles.col}>
            <h5 style={footerStyles.widgetTitle}>Support</h5>
            <ul style={footerStyles.footerMenu}>
              <li><a href="#" style={footerStyles.footerMenuItem}>Help</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Support</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Privacy Policy</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Term & Conditions</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Help & Support</a></li>
            </ul>
          </div>

          {/* Widget 4 */}
          <div className="col-12 col-sm-6 col-lg" style={footerStyles.col}>
            <h5 style={footerStyles.widgetTitle}>Contact</h5>
            <ul style={footerStyles.footerMenu}>
              <li><a href="#" style={footerStyles.footerMenuItem}>Call Centre</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Email Us</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Term & Conditions</a></li>
              <li><a href="#" style={footerStyles.footerMenuItem}>Help Center</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
