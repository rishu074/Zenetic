# Zenetic - Your Personal Productivity Sanctuary 🌟

> A mindful productivity application that helps you track tasks, journal your thoughts, and achieve mental clarity through zen practices.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey)](https://expressjs.com/)

## 🎯 Overview

Zenetic is a personal productivity and mindfulness application that combines task management, journaling, and zen practices. The name "Zenetic" is a fusion of "Zen" (mindful presence) and "Genetic" (core patterns), reflecting the app's focus on cultivating mindful productivity habits.

### ✨ Key Features

- **Task Management**
  - Create one-time and recurring tasks
  - Track task completion status
  - Smart recurring task reminders (weekly, bi-weekly, monthly)
  - Intuitive task organization and prioritization

- **Journaling**
  - Private, secure daily journal entries
  - Track your personal growth journey
  - Build a meaningful narrative of your experiences
  - End-to-end encrypted for complete privacy

- **Mindfulness Observations & Analytics**
  - Track thought patterns, emotions, and behavioral tendencies
  - Implementation of Zenoga practices (as described by PJ Saher)
  - Comprehensive analytics dashboard
  - Visual insights into personal patterns and trends

- **Drift Tracking**
  - Implement the Drift Watching practice from Zenoga
  - Monitor focus deviations and attention patterns
  - Visual analytics for understanding concentration trends
  - Actionable insights for improving focus

## 🛠️ Tech Stack

- **Backend Architecture**
  - Node.js with Express framework
  - TypeScript for type safety
  - MongoDB with Mongoose ODM
  - Winston for structured logging
  - EJS templating engine

- **Security & Performance**
  - bcrypt for secure authentication
  - Compression middleware
  - Environment-based configuration
  - Secure cookie management

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB (latest stable version)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/zenetic.git
   cd zenetic
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory:
   ```env
   PORT=3000                    # Server port number
   NODE_ENV=development        # Environment mode (development/production)
   HOST=localhost             # Server host address
   HTTPS=false               # HTTPS configuration
   CONSOLE_LOG_LEVEL=info    # Logging level
   APP_LOGS=./logs          # Application logs directory
   MONGO_DB=zenetic         # MongoDB database name
   PASSWORD_HASH=           # Your bcrypt password hash
   ```

4. Build and run
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 📱 Usage Guide

1. **Initial Setup**
   - Complete the installation steps above
   - Generate a password hash using [bcrypt-generator.com](https://bcrypt-generator.com/) (10 rounds)
   - Set the generated hash in your `.env` file
   - Start the application and log in with your chosen password

2. **Core Features**
   - Task Management: Create, organize, and track tasks
   - Journaling: Record daily reflections and insights
   - Mindfulness: Track thoughts and emotional patterns
   - Drift Watching: Monitor and analyze focus patterns

3. **Analytics Dashboard**
   - Task completion metrics
   - Journal entry statistics
   - Mindfulness pattern analysis
   - Focus drift visualizations

## 🔒 Security

- End-to-end encryption for journal entries
- Secure password hashing
- Environment-based security configurations
- Regular security updates

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by "Zenoga" by PJ Saher
- Built with Express.js, MongoDB, and other open-source technologies
- Special thanks to the open-source community

---

Made with ❤️ by Rishu
