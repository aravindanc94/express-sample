pipeline{
    agent {
        node 'dit'
    }
    
    stages{
        stage('Preflight check'){
            steps{
                echo 'Chceking docker'
                sh 'docker -v'
                echo 'Chceking docker'
                sh 'git --version'
                echo 'Checking node'
                sh 'node -v'
                echo 'Deleting previous code'
                sh 'rm -rf app'
            }
        }
        stage('Git cloning repo makkpsss/express-sample'){
            steps{
                sh 'echo \'pulling repo!\''
                sh 'git clone https://github.com/aravindanc94/express-sample.git app'
            }
        }
        stage('Building docker image'){
            steps{
                echo 'build'
                sh 'docker build -t expressapp:v1 /home/dit-user/workspace/dock_demo/app/'
            }
        }
        stage('Spinning off containers'){
            steps{
                echo 'Creating container'
                sh 'docker run -d -p 2300:2300 expressapp:v1'
            }
        }
        stage('Testing Build'){
            steps{
                echo 'Testing build'
            }
        }
        stage('Cleaning Repo'){
            steps{
                sh 'rm -rf app'
            }
        }
        stage('Cleaning docker images & Containers'){
            steps{
                echo 'Stopping docker images'
                sh 'docker rm $(docker stop $(docker ps -a -f ancestor=expressapp:v1 --format "{{.Names}}"))'
            }
        }
    }
}
