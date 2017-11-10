module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const VideoRoom = app.model.define('videoRoom', {
    platform: {
      type: STRING,
      allowNull: false
    },
    roomId: {
      type: STRING,
      defaultValue: '',
    },
    host: {
      type: STRING,
      defaultValue: '',
    },
    tag: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    online: {
      type: INTEGER,
      defaultValue: 0,
    },
    screenShoot: {
      type: STRING,
      defaultValue: ''
    },
    hostName: {
      type: STRING,
      defaultValue: ''
    },
    title: {
      type: STRING,
      defaultValue: ''
    },
    link: {
      type: STRING,
      defaultValue: ''
    }
  })

  VideoRoom.quickCreate = function({
    platform,
    roomId = '',
    host = '',
    tag = platform + roomId + host
  }) {
    return VideoRoom.create({
      platform,
      roomId,
      host,
      tag
    })
  }

  VideoRoom.associate = function () {
    app.model.VideoRoom.belongsToMany(app.model.User, {
      through: 'UserVideoRoom',
      foreignKey: 'videoRoomId',
      otherKey: 'userId'
    })
  }

  return VideoRoom
}