FROM openjdk:17-jdk-slim

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/trading-platform-1.0.0.jar"] 