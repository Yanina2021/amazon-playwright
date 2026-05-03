pipeline {
    agent any

    tools {
    nodejs "NodeJS"
}
    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            emailext (
                subject: "Resultado ejecución Amazon Challenge",
                body: "Adjunto reporte de ejecución.",
                to: "yaninamquinteros@gmail.com",
                attachmentsPattern: 'playwright-report/**'
            )
        }
    }
}
