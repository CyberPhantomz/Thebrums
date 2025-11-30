import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
            <footer className="py-8 text-center text-slate-400 text-sm">
                <p>© {new Date().getFullYear()} EcoScan AI. Making the world greener.</p>
            </footer>
        </div>
    );
};
