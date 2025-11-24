# 1) Base image
FROM node:18-alpine

# 2) App folder
WORKDIR /app

# 3) Install dependencies
COPY package*.json ./
RUN npm install --production

# 4) Copy source
COPY . .

# 5) Expose port
EXPOSE 5000

# 6) Run app
CMD ["npm", "start"]
