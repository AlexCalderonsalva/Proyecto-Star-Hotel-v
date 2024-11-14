# Etapa de construcción
FROM maven:3.8.5-openjdk-11-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa de ejecución
# Iimagen base con JDK 11
FROM openjdk:11-jdk-slim

# Establece el directorio de trabajo
WORKDIR /app

# Nombre del jar del proyecto al contenedor
COPY target/ProyectoReservasStarHotel-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]