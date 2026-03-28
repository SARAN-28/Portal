import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">

      <div className="home-content">

        <h1>Welcome to <span>PORTAL</span></h1>

        <p className="home-subtitle">
          Manage employees, track data, and control access — all in one place.
        </p>

        <div className="home-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <h4>🔐 Secure</h4>
            <p>JWT authentication & role-based access</p>
          </div>

          <div className="feature-card">
            <h4>⚡ Fast</h4>
            <p>Quick employee management system</p>
          </div>

          <div className="feature-card">
            <h4>📊 Organized</h4>
            <p>Structured employee profiles & data</p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Home;  