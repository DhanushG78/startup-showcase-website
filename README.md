# 🚀 Startup Showcase

Startup Showcase is a premium, high-performance web application designed to discover and explore innovative startups. Powered by **Contentstack CMS** and built with **Next.js 16**, it features a real-time data connection, dynamic content rendering, and a state-of-the-art dark-themed UI.

## ✨ Features

- **Headless CMS Integration:** Real-time data fetching from Contentstack.
- **Dynamic Routes:** Individual product detail pages for every startup.
- **Premium UI/UX:** A sleek, modern dark theme with glassmorphism and fluid animations.
- **Advanced Filtering:** Instant category-based filtering and search functionality.
- **Responsive Design:** Optimized for all devices, from mobile to ultra-wide displays.
- **Loading States:** Shimmer skeletons for a seamless perceived performance.
- **SEO Optimized:** Dynamic metadata generation for every product page.

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS / Vanilla CSS Variables
- **CMS:** Contentstack (Headless)
- **Deployment:** Contentstack Launch
- **Typography:** Inter & Space Grotesk (Google Fonts)

## 🚀 Live Demo

The project is live and deployed on **Contentstack Launch**:
👉 **[Live Link](https://startup-showcase.contentstackapp.com)** *(Placeholder Link)*

## ⚙️ Development Setup

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Contentstack API Credentials

### Environment Variables

Create a `.env.local` file in the root directory and add your Contentstack credentials:

```bash
CONTENTSTACK_API_KEY=your_api_key
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
CONTENTSTACK_ENVIRONMENT=your_environment
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/startup-showcase.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js 16 App Router pages and layouts.
- `app/components/`: Reusable Client and Server UI components.
- `app/product/[uid]/`: Dynamic product detail page routes.
- `lib/`: Data fetching utilities and Contentstack configuration.
- `public/`: Static assets like icons and images.

## 📄 License

This project is licensed under the MIT License.
