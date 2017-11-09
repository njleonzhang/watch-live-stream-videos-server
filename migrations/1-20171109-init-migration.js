'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "VideoRooms", deps: []
 * createTable "UserVideoRoom", deps: [VideoRooms, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "20171109-init-migration.js",
    "created": "2017-11-09T02:13:16.011Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "userName": {
                    "type": Sequelize.STRING,
                    "unique": true
                },
                "cellphone": {
                    "type": Sequelize.STRING,
                    "unique": true
                },
                "idNumber": {
                    "type": Sequelize.STRING,
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "VideoRooms",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "platform": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "roomId": {
                    "type": Sequelize.STRING,
                    "defaultValue": ""
                },
                "host": {
                    "type": Sequelize.STRING,
                    "defaultValue": ""
                },
                "tag": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "unique": true
                },
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "UserVideoRoom",
            {
                "created_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updated_at": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "videoRoomId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "VideoRooms",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
