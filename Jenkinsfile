pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    stages {
        stage('Restore') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build'
            }
        }
        stage('Test') {
            steps {
                sh 'ng test'
            }
        }                
    }
}
