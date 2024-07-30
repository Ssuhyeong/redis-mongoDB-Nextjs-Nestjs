# Base image
FROM node:22

# working directory 컨테이너 안에 설정
WORKDIR /app

# package.json & package-lock.json 복사
COPY package*.json ./

# Install dependencies
RUN yarn

# Source code Copy
COPY . .

# EXpose the port on react app will run
EXPOSE 3001

# Start the react app
CMD ["yarn", "dev", "-p", "3001"]