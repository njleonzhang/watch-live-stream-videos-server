'use strict';

module.exports = app => {
  app.post('/auth/login', 'auth.login')
  app.post('/auth/register', 'auth.register')
  app.get('/auth/logout', 'auth.logout')
  // app.post('/video_room/add', 'videoRoom.add')
  app.post('/user/add_video_room', 'user.addVideoRoom')
  app.get('/user/rooms', 'user.getRooms')
}
