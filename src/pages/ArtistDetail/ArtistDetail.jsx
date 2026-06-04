function ArtistDetail() {
    return (

        <SongList
    key={song.id}
    song={song}
    index={index}
    albumId={album.id}
    onPlaySong={handlePlaySong}
/>

    );
}

export default ArtistDetail;