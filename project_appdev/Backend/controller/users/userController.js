const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userModel = require('../../model/userModel');

const userController = {
  // User Registration
  registrationHandler: async (req, res) => {
    const { fullname, email, password } = req.body;

    userModel.findByEmail(email, async (err, users) => {
      if (err) return res.status(500).json({ message: 'Error checking user.' });
      if (users.length > 0) return res.status(400).json({ message: 'This email is already registered.' });

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        userModel.create({ fullname, email, password: hashedPassword, verification_token: verificationToken }, (err) => {
          if (err) return res.status(500).json({ message: 'Error registering user.' });

          // Sending verification email (kept intact as per your request)
          const verificationUrl = `http://localhost:5555/verify-email?token=${verificationToken}`;
          const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the link: ${verificationUrl}`,
          };

          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'med696200@gmail.com',
              pass: 'nlxe macn xwbi xddn', // App-specific password
            },
          });

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log('Error sending email:', err);
              return res.status(500).json({ message: 'Error sending verification email.' });
            }
            console.log('Verification email sent:', info.response);
            res.status(200).json({ message: 'Registration successful. Please check your email to verify your account.' });
          });
        });
      } catch (err) {
        return res.status(500).json({ message: 'Error hashing password.' });
      }
    });
  },

  // Email Verification
  verifyEmail: (req, res) => {
    const { token } = req.query;

    userModel.findByVerificationToken(token, (err, users) => {
      if (err) {
        console.error('Error finding user by verification token:', err);
        return res.status(500).send('Internal error occurred.');
      }
      if (users.length === 0) {
        return res.status(400).send('Invalid or expired verification token.');
      }

      const user = users[0];

      userModel.updateVerificationStatus(user.id, (err) => {
        if (err) {
          console.error('Error updating verification status:', err);
          return res.status(500).send('Error verifying email.');
        }
        res.send('Your email has been verified! You may now log in.');
      });
    });
  },

  // User Login
  loginHandler: async (req, res) => {
    const { email, password } = req.body;

    userModel.findByEmail(email, async (err, users) => {
      if (err || users.length === 0) return res.status(401).json({ message: 'This account is not registered.' });

      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) return res.status(401).json({ message: 'Incorrect password.' });
      if (!user.is_verified) return res.status(401).json({ message: 'Please verify your Gmail before logging in.' });

      // Store user ID in session after successful login
      req.session.userId = user.id;

      return res.status(200).json({
        verified: user.is_verified,
        message: 'Login successful',
        user: {
          fullname: user.fullname,
          email: user.email,
        },
      });
    });
  },

  // Profile Handler
  profileHandler: (req, res) => {
    const userId = req.session.userId;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    userModel.findById(userId, (err, users) => {
      if (err || users.length === 0) return res.status(404).json({ message: 'User not found' });

      const user = users[0];
      return res.status(200).json({
        user: {
          fullname: user.fullname,
          email: user.email,
        },
      });
    });
  },
};

module.exports = userController;
