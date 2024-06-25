const express = require('express')
const playListController = require('./controllers/playListController')

const router = express.Router()

router.get('/playlists', playListController.index)
router.get('/playlists/:id', playListController.show)
router.post('/playlists/', playListController.create)
router.put('/playlists/:id', playListController.update)
router.delete('/playlists/:id', playListController.delete)

router.post('/playlists/:id/songs', playListController.createSong)
router.delete('/playlists/:id/songs/:idSong', playListController.deleteSong)

module.exports = router
