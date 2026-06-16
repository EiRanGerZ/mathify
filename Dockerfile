# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Cache dependencies layer separately from source code
# so `mvn package` doesn't re-download deps on every source change
COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
# Frontend sources (Vite project). The frontend-maven-plugin builds these during
# `mvn package` and emits the bundle into src/main/webapp/assets/app.
COPY frontend ./frontend
RUN mvn package -DskipTests

# Stage 2: Run
FROM tomcat:10-jdk17
RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=builder /app/target/mathify.war /usr/local/tomcat/webapps/ROOT.war
EXPOSE 8080