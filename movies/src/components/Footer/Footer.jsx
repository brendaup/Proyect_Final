import "./Footer.css"

const Footer = () => {
  return (
    <div>
      <div className="social-container">
        <a href="https://www.instagram.com/">
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/">
          <i class="fa-brands fa-youtube"></i>
        </a>
        <a href="https://twitter.com/i/flow/login?redirect_after_login=%2F">
          <i class="fa-brands fa-twitter"></i>
        </a>
        <a href="https://es-es.facebook.com/">
          <i class="fa-brands fa-facebook"></i>
        </a>
      </div>
      <p>© 2023 UpgradeFlix - All rights reserved</p>
    </div>
  );
};

export default Footer;