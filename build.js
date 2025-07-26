#!/usr/bin/env node

/**
 * Build Script for Chatbot Flow Builder
 * 
 * This script builds the Next.js application for production deployment.
 * It runs the Next.js build process and creates optimized static files.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Chatbot Flow Builder build process...\n');

try {
    // Check if package.json exists
    if (!fs.existsSync('package.json')) {
        throw new Error('package.json not found. Make sure you are in the project root directory.');
    }

    // Install dependencies if node_modules doesn't exist
    if (!fs.existsSync('node_modules')) {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
        console.log('✅ Dependencies installed successfully!\n');
    }

    // Run the build
    console.log('🔨 Building the application...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!\n');

    // Check if build output exists
    if (fs.existsSync('.next')) {
        console.log('📁 Build output created in .next directory');

        // Display build info
        const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8').trim();
        console.log(`📋 Build ID: ${buildId}`);

        console.log('\n🎉 Build process completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('   • Run "npm start" to start the production server');
        console.log('   • Deploy the .next directory to your hosting platform');
        console.log('   • For Vercel: Push to GitHub and it will auto-deploy');

    } else {
        throw new Error('Build output not found. Build may have failed.');
    }

} catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
}