---
sidebar_position: 2
---

# Installation

Set up Ellithium in your Java project with these simple steps.

## Prerequisites

- Java Development Kit (JDK) 21 or higher
- Maven 3.8.1 or higher (3.9.9 recommended)
- Your favorite IDE (IntelliJ IDEA or VS Code recommended)

## Step 1: Add Maven Dependency

Add Ellithium to your project by including this dependency in your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.abdelrhman-ellithy</groupId>
    <artifactId>ellithium</artifactId>
    <version>2.1.0</version> // check the latest version on the repo
</dependency>
```

## Step 2: Configure Your Project

Your `pom.xml` should include these essential configurations:

```xml
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <version>2.1.0</version> // check the latest version on the repo
</properties>

<build>
    <plugins>
        <!-- Maven Compiler Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.14.0</version>
            <configuration>
                <source>21</source>
                <target>21</target>
            </configuration>
        </plugin>

        <!-- Maven Surefire Plugin -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.5.3</version>
            <configuration>
                <reportsDirectory>${project.build.directory}/surefire-reports</reportsDirectory>
                <testFailureIgnore>true</testFailureIgnore>
                <failIfNoTests>false</failIfNoTests>
                <systemPropertyVariables>
                    <testng.dtd.http>true</testng.dtd.http>
                </systemPropertyVariables>
                <properties>
                    <property>
                        <name>listener</name>
                        <value>Ellithium.core.execution.listener.CustomTestNGListener</value>
                    </property>
                </properties>
            </configuration>
        </plugin>

        <!-- Exec Maven Plugin -->
        <plugin>
            <groupId>org.codehaus.mojo</groupId>
            <artifactId>exec-maven-plugin</artifactId>
            <version>3.5.0</version>
            <executions>
                <execution>
                    <id>intialize</id>
                    <phase>initialize</phase>
                    <goals>
                        <goal>java</goal>
                    </goals>
                    <configuration>
                        <mainClass>Ellithium.core.execution.Internal.Loader.StartUpLoader</mainClass>
                        <includePluginDependencies>true</includePluginDependencies>
                        <classpathScope>compile</classpathScope>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
    <resources>
        <resource>
            <directory>src/main/resources/properties</directory>
            <includes>
                <include>**/*</include>
            </includes>
        </resource>
    </resources>
</build>
```

## Step 3: Initialize the Project

Run this command in your project directory to initialize Ellithium:

```bash
mvn clean test
```

This command will download all dependencies and set up the framework for your project.
