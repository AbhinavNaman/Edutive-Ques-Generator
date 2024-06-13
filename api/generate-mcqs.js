import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'http://4.227.155.222:8090',
  changeOrigin: true,
  pathRewrite: { '^/api/generate-mcqs': '/generate-mcqs' },
});
