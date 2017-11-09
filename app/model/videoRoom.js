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