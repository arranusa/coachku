pipeline {
    agent any

    environment {
        SERVER_USER = "arranusa"
        SERVER_HOST = "100.125.157.117"
        DEPLOY_PATH = "/home/${SERVER_USER}/coachku"
        SSH_CREDENTIALS_ID = "ssh-server-credentials"
        SSH_OPTS  = "-o StrictHostKeyChecking=no"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Package') {
            steps {
                sh 'sed -i "s/\\r$//" mvnw'
                sh 'chmod +x mvnw'
                sh './mvnw clean package -DskipTests'
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(["${SSH_CREDENTIALS_ID}"]) {
                    // Buat direktori di server target
                    sh "ssh ${SSH_OPTS} ${SERVER_USER}@${SERVER_HOST} 'mkdir -p ${DEPLOY_PATH}/target'"

                    // Kirim berkas artefak, Dockerfile, dan docker-compose.yml
                    sh "scp ${SSH_OPTS} -r target/quarkus-app/ ${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}/target/"
                    sh "scp ${SSH_OPTS} src/main/docker/Dockerfile.jvm ${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}/Dockerfile.jvm"
                    sh "scp ${SSH_OPTS} src/main/docker/docker-compose.yml ${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}/docker-compose.yml"

                    // Bangun Image dan Jalankan Kontainer di Server Target
                    sh "ssh ${SSH_OPTS} ${SERVER_USER}@${SERVER_HOST} 'cd ${DEPLOY_PATH} && docker compose up -d --build && docker image prune -a -f'"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}