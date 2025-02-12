import React, { useState } from 'react';

const Passcrypt = () => {
  // Password state variables
  const [password, setPassword] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [decryptPasswordInput, setDecryptPasswordInput] = useState('');
  const [decryptedPassword, setDecryptedPassword] = useState('');

  // Copy to clipboard helper
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Encrypt password handler
  const handleEncryptPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      // Check if response is ok (status 200–299)
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }
      const data = await response.json();
      setEncryptedPassword(data.encryptedString);
      setDecryptPasswordInput(data.encryptedString);
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Password encryption failed. Check console for details.');
    }
  };

  // Decrypt password handler
  const handleDecryptPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedString: decryptPasswordInput })
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }
      const data = await response.json();
      setDecryptedPassword(data.password);
    } catch (error) {
      console.error('Decryption error:', error);
      alert('Password decryption failed. Check console for details.');
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1 style={styles.logo}>PassCrypt</h1>
      </nav>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Store Password</h2>
          <form onSubmit={handleEncryptPassword} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" style={styles.button}>
              Encrypt Password
            </button>
          </form>
          <div style={styles.encryptedSection}>
            <label style={styles.label}>Encrypted Password</label>
            <div style={styles.copyContainer}>
              <input
                type="text"
                style={{ ...styles.input, ...styles.fadedInput }}
                value={encryptedPassword}
                readOnly
              />
              <button
                style={styles.copyButton}
                onClick={() => handleCopy(encryptedPassword)}
              >
                📋 Copy
              </button>
            </div>
          </div>
          <div style={styles.encryptedSection}>
            <h3 style={styles.sectionTitle}>Reveal Password</h3>
            <form onSubmit={handleDecryptPassword} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Encrypted Password</label>
                <input
                  type="text"
                  placeholder="Enter encrypted password"
                  style={styles.input}
                  value={decryptPasswordInput}
                  onChange={(e) => setDecryptPasswordInput(e.target.value)}
                />
              </div>
              <button type="submit" style={styles.button}>
                Decrypt Password
              </button>
            </form>
            <div style={styles.copyContainer}>
              <input
                type="text"
                style={{ ...styles.input, ...styles.fadedInput }}
                value={decryptedPassword}
                readOnly
              />
              <button
                style={styles.copyButton}
                onClick={() => handleCopy(decryptedPassword)}
              >
                📋 Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 PassCrypt. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eff2ff',
    color: '#4f48cd'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    backgroundColor: '#eff2ff'
  },
  logo: {
    fontSize: '1.5rem',
    color: '#6d66ea'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3rem',
    padding: '2rem 5%',
    justifyContent: 'center'
  },
  section: {
    flex: '1 1 300px',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    marginBottom: '1rem',
    color: '#413584'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem'
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #303C55',
    backgroundColor: '#ffffff',
    color: '#000000',
    flex: 1
  },
  fadedInput: {
    color: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#f8f8f8',
    border: '1px solid #ddd',
    cursor: 'not-allowed'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  copyContainer: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  copyButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6d66ea',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#eff2ff',
    marginTop: 'auto'
  }
};

export default Passcrypt;
