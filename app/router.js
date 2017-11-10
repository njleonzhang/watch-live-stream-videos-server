'use strict';

module.exports = app => {
  app.post('/auth/login', 'auth.login')
  app.post('/auth/register', 'auth.register')
  app.post('/video_room/add', 'videoRoom.add')
  app.post('/user/add_video_room', 'user.addVideoRoom')
  app.get('/user/get_rooms', 'user.getRooms')
}
