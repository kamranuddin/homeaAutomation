export default {
    name: 'staging',
    mysql: {
        username: 'verse',
        password: 'verse',
        multiStatement: false,
        dbName: 'cryptax',
        host: 'localhost',
        enableLogging: false
    },
    influx: {
        // TODO remove url
        url: 'http://localhost:8086/sensu',
        host: 'http://localhost:8086/sensu'
    },
    grafana: {
        host: '54.245.163.213:4000'
    },
    app: {
        // host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        host: 'localhost',
        serveDummyStatusData: true
    }
}
