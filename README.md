# EcoScan AI 🌿

EcoScan AI is a gamified recycling assistant that uses Google's Gemini AI to identify waste items and guide users on how to recycle them correctly. Earn points, climb the leaderboard, and make a positive impact on the environment!

![Dashboard Preview](https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop)

## ✨ Features

-   **AI-Powered Identification**: Instantly identifies waste items using Gemini 1.5 Flash.
-   **Gamification**: Earn points for every item you scan.
-   **Leaderboard**: Compete with others to become the top recycler.
-   **Dashboard**: A beautiful landing page tracking community impact.
-   **Premium Design**: Modern UI with smooth animations and glassmorphism effects.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS, Framer Motion
-   **AI**: Google Gemini API
-   **Icons**: Lucide React

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   **Node.js** (v16 or higher) installed.
-   A **Google Gemini API Key**. You can get one [here](https://aistudio.google.com/app/apikey).

### Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd ecoscan-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory (copy from `.env.example` if available):
    ```bash
    cp .env.example .env
    ```

2.  Add your Gemini API Key to the `.env` file:
    ```env
    VITE_GOOGLE_GENAI_API_KEY=your_api_key_here
    ```

### 🏃‍♂️ Running the App

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 🏗️ Building for Production

To build the app for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📝 Usage

1.  **Register**: Create an account on the sign-up page.
2.  **Scan**: Upload a photo of trash or recycling.
3.  **Learn**: Read the AI's advice on how to dispose of it.
4.  **Earn**: Get points and check your rank on the leaderboard!

---

Made with 💚 for a cleaner planet.

## collaborators
this project was created by  mahdi ,azeem,tang enow and amour

