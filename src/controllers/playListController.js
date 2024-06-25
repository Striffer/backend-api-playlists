const playlists = []

module.exports = {
  // GET /playlists
  index: (req, res) => {
    res.json(playlists)
  },

  // GET /playlists/:id
  show: (req, res) => {
    const { id } = req.params

    const playlist = playlists.find(playlist => playlist.id === +id)

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found!' })
    }

    res.json(playlist)
  },

  //POST /playlists
  create: (req, res) => {
    const { title, tags, songs } = req.body

    if (typeof title !== 'string') {
      return res.status(400).json({ message: 'Title must be a string!' })
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags must be an array!' })
    }

    const newPlaylist = {
      id: Math.floor(Math.random() * 1000000),
      title: title,
      tags: tags,
      songs: songs ?? []
    }

    playlists.push(newPlaylist)

    res.status(201).json(newPlaylist)
  },

  //PUT /playlists/:id
  update: (req, res) => {
    const { id } = req.params
    const { title, tags } = req.body

    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'playlist not found!' })
    }

    if (typeof title === 'string') {
      playlists[playlistIndex].title = title
    }
    if (tags && Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags
    }

    res.json(playlists[playlistIndex])
  },

  //DELETE /playlists/:id
  delete: (req, res) => {
    const { id } = req.params

    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

    if (playlistIndex === -1) {
      return res.json({ message: 'playlist not found!' })
    }

    const deletedPlaylist = playlists.splice(playlistIndex, 1)

    res.json(deletedPlaylist)
  },

  //POST /playlists/:id/songs
  createSong: (req, res) => {
    const { id } = req.params
    const { name, composer, album } = req.body

    const playlist = playlists.find(playlist => playlist.id === +id)

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found!' })
    }

    if (typeof name !== 'string') {
      return res.status(400).json({ message: 'name must be a string' })
    }
    if (typeof composer !== 'string') {
      return res.status(400).json({ message: 'composer must be a string' })
    }
    if (typeof album !== 'string') {
      return res.status(400).json({ message: 'album must be a string' })
    }

    const song = {
      id: Math.floor(Math.random() * 1000000),
      name: name,
      composer: composer,
      album: album
    }

    playlist.songs.push(song)

    res.status(201).json(song)
  },

  //DELETE /playlists/:id/songs/:idsong
  deleteSong: (req, res) => {
    const { id, idSong } = req.params

    const playlistIndex = playlists.findIndex(playlist => playlist.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'playlist not found!' })
    }

    const songIndex = playlists[playlistIndex].songs.findIndex(
      song => song.id === +idSong
    )

    if (songIndex === -1) {
      return res.status(404).json({ message: 'song not found!' })
    }

    const deletedSong = playlists[playlistIndex].songs.splice(songIndex, 1)

    res.json(deletedSong)
  }
}
