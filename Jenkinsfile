pipeline {
    agent { docker { image 'node:6.14.8' } }
    stages {
        stage('View Node Version') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
