# Vercel Deployment Guide

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account with access to the repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

### Step 1: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Choose `L1BridgeDev/private-shareholder-voice`
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Configuration**
   - **Project Name**: `private-shareholder-voice`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. **Environment Variables**
   Add the following environment variables in Vercel dashboard:

   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
   ```

   **How to add environment variables:**
   - In project settings, go to "Environment Variables" tab
   - Click "Add New"
   - Enter variable name and value
   - Select "Production", "Preview", and "Development" environments
   - Click "Save"

### Step 3: Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for build process to complete (usually 2-3 minutes)
   - Vercel will automatically assign a URL like `https://private-shareholder-voice-xxx.vercel.app`

2. **Verify Deployment**
   - Click on the generated URL to open your deployed application
   - Test wallet connection functionality
   - Verify all features are working correctly

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - In project dashboard, go to "Domains" tab
   - Click "Add Domain"
   - Enter your domain name (e.g., `private-shareholder-voice.com`)
   - Follow DNS configuration instructions

2. **DNS Configuration**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP addresses
   - Wait for DNS propagation (up to 24 hours)

### Step 5: Automatic Deployments

1. **GitHub Integration**
   - Vercel automatically deploys on every push to main branch
   - Preview deployments are created for pull requests
   - Build logs are available in Vercel dashboard

2. **Deployment Settings**
   - Go to "Settings" > "Git"
   - Configure branch settings if needed
   - Enable/disable automatic deployments

### Step 6: Production Optimization

1. **Performance Settings**
   - Enable "Edge Functions" for better performance
   - Configure caching headers in `vercel.json` if needed
   - Monitor performance in Vercel Analytics

2. **Security Headers**
   Add `vercel.json` file to project root:
   ```json
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "Referrer-Policy",
             "value": "origin-when-cross-origin"
           }
         ]
       }
     ]
   }
   ```

### Step 7: Monitoring and Maintenance

1. **Analytics**
   - Enable Vercel Analytics for usage insights
   - Monitor Core Web Vitals
   - Track deployment performance

2. **Error Monitoring**
   - Set up error tracking (optional)
   - Monitor build failures
   - Check deployment logs regularly

### Troubleshooting

**Common Issues:**

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in `package.json`
   - Ensure environment variables are set correctly

2. **Environment Variables Not Working**
   - Verify variable names match exactly (case-sensitive)
   - Ensure variables are added to all environments
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify RPC URLs are accessible
   - Check WalletConnect Project ID
   - Ensure correct chain ID is set

4. **Custom Domain Not Working**
   - Check DNS configuration
   - Wait for DNS propagation
   - Verify domain is properly added in Vercel

### Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Application functionality tested
- [ ] Custom domain configured (if applicable)
- [ ] Security headers added
- [ ] Analytics enabled
- [ ] Error monitoring set up

### Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Contact Vercel support through dashboard
- Review project logs in Vercel dashboard

### Post-Deployment

After successful deployment:
1. Test all application features
2. Verify wallet connections work
3. Check responsive design on mobile devices
4. Monitor application performance
5. Set up regular backups if needed
6. Document any custom configurations

---

**Deployment URL**: Will be provided after successful deployment
**Last Updated**: $(date)
**Version**: 1.0.0
