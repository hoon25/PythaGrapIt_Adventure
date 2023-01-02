FROM openjdk:11-jre-slim

COPY build/libs/springSocket-0.0.1-SNAPSHOT.jar app.jar
#COPY . .
#RUN ./gradlew build

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]