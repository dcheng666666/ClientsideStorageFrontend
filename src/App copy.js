import React from 'react';
import './App.css';
import {openDB} from 'idb'

class App extends React.Component {
    async testIndexDB()  {
        let db = await openDB('test-db2', 1, { upgrade(db, oldVersion, newVersion, transaction) {
            console.log(`version upgrade from ${oldVersion} to ${newVersion}, transcation:${transaction}`);

            if (!db.objectStoreNames.contains('logs')) {
                console.log('create log object store');
                db.createObjectStore('logs', {keyPath: 'id', autoIncrement: true});
              }
            }
        });

        var tx = db.transaction('logs', 'readwrite');
        var store = tx.objectStore('logs');
        var item = {
          name: 'sandwich',
          price: 4.99,
          description: 'A very tasty sandwich',
          created: new Date().getTime()
        };
        store.add(item);
        store.add({note: 'finish'});
        console.log('added item to the store os!');
        return tx.complete;
    }

    componentDidMount() {
        // this.testIndexDB();
        // const request = window.indexedDB.open('testdb');
        // let db = null;
        // request.onerror = function(event) {
        //     console.log('open db fail');
        // }
        // request.onsuccess = function(event) {
        //     console.log('open db success');
        //     db = event.target.result;
        //     const store = db.transaction('log', 'readwrite').objectStore('log');
        //     store.add({message: 'hello'});
        //     store.add({message: 'finish'});
        // }
        // request.onupgradeneeded = function(event) {
        //     db = event.target.result;
        //     let logStore = db.createObjectStore('log', {keyPath: 'id', autoIncrement: true});
        //     logStore.transaction.oncomplete = function(event) {
        //         const store = db.transaction('log', 'readwrite').objectStore('log');
        //         store.add({message: 'hello'});
        //         store.add({message: 'finish'});
        //     }
        // }
        const SumoLogger = require('sumo-logger');
        var opts = {
            endpoint: "https://collectors.us2.sumologic.com/receiver/v1/http/ZaVnC4dhaV2IyEW9BvfK5w-fMn9KtAMXLMWMj1g2SCbjxz6xTBWns2WSeBb0lSw6T6DciW8HFi7u1Xo6GHJ0GQfnp29_1tl6e_3gaNTvQFp4Rs2HjtBsNg==",
            returnPromise: false,
            interval: 2000, // Send messages in batches every 20 seconds
            batchSize: 100000, // Or when total log length reaches 100k characters
            sendErrors: true,
            sessionKey: 'Abc32df34rfg54gui8j098dv13sq5re', // generate a GUID
            sourceName: 'frontend',
            sourceCategory: 'psa-salesforce-uat',
            hostName: 'My Host Name',
            onSuccess: function() {
              // ... handle success ....
              console.log('handle success');
            },
            onError: function() {
              // ... handle error ....
              console.log('handle failed');
            },
            graphite: false // Enable graphite metrics
          };

        // Instantiate the SumoLogger
        const sumoLogger = new SumoLogger(opts);

        // Push a message to be logged
        let index = 1
        setInterval(() => {
            sumoLogger.log(`hello:${index}`, {
            sessionKey: 'Abc32df34rfg54gui8j098dv13sq5re',
            url: 'https://youDomain.com/actual/page/served'
          });
          index += 1;
        }, 1000);


        // Flush any logs, typically this line would be in your shutdown code
        sumoLogger.flushLogs();
    }

    render() {
        return (
            <div className="App">
            hello world 1
            </div>
        )
    }
}

export default App;
