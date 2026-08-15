import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-bar">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Andy Luo. All rights reserved.</p>

      </div>
    </footer>
  );
}
