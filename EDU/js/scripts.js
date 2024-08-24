// List of radio stations with their URLs
const radioStations = {
    "RocKorsou 88.3 FM": "https://stream.zeno.fm/tbrwtd58f18uv",
    "Dushi FM 88.9": "https://s7.voscast.com:9139/live",
    "Radio Krioyo 89.7 FM": "https://usa7.fastcast4u.com/proxy/lfxmgisa?mp=/1",
    "Radio Margaritha 90.3 FM": "https://usa7.fastcast4u.com/proxy/lfxmgisa?mp=/1",
    "HOW Radio 90.9 FM": "https://s7.voscast.com:9139/live",
    "Hit Radio 91.5 FM": "https://stream.paradisefm.cw/HITradio915",
    "Radio Life 92.1 FM": "https://s9.voscast.com:7369/921fm",
    "Radio Deltha Edukativo 92.7 FM": "https://node1.westream.solutions/delta",
    "Radio New Song 96.5 FM": "http://s7.voscast.com:8704/stream",
    "Dolfijn FM 97.3 FM": "https://radiostreamfm.com/radio/8130/radio.mp3",
    "Radio Mas 99.7 FM": "https://node1.westream.solutions/mas99",
    "Radio Hoyer-1 101.9 FM": "https://s1.voscast.com:10487/live",
    "Paradise 103.1 FM": "https://stream.paradisefm.cw/ParadiseFM",
    "Radio One 103.9 FM": "https://8793843.com/7896326782",
    "Radio Active 104.5 FM": "https://node1.westream.solutions/RadioActive",
    "Radio Hoyer-2 105.1 FM": "https://s1.voscast.com:10489/live",
    "Radio Direct 107.1 FM": "https://edge1.direct107.com/;?type=http&nocache=28",
    "Rumbera Network 107.9 FM": "https://redradioypc.com:8038/stream"
};

// List of TV channels with their URLs
const tvChannels = {
    "TV 13": { url: "https://oqgdrog4d4rm-hls-live.5centscdn.com/tvdirect/f7b44cfafd5c52223d5498196c8a2e7b.sdp/playlist.m3u8", isM3U8: true },
    "NOS PAIS": { url: "https://ssl.streampartner.nl/player.php?url=5rfdekr5tjgifuhrn5tu", isM3U8: false }
};

// Function to play the selected radio station
function playRadio(station) {
    const player = document.getElementById('radioPlayer');
    const tvPlayer = document.getElementById('tvPlayer');

    // Stop the TV player if it's playing
    if (!tvPlayer.paused) {
        tvPlayer.pause();
        tvPlayer.currentTime = 0;
    }

    // Set the radio source and play
    player.src = radioStations[station];
    player.play();
}

// Function to play the selected TV channel
function playTV(channel) {
    const player = document.getElementById('tvPlayer');
    const channelInfo = tvChannels[channel];
    const radioPlayer = document.getElementById('radioPlayer');

    // Stop the radio player if it's playing
    if (!radioPlayer.paused) {
        radioPlayer.pause();
        radioPlayer.currentTime = 0;
    }

    if (channelInfo.isM3U8) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(channelInfo.url);
            hls.attachMedia(player);
            player.play();
        } else if (player.canPlayType('application/vnd.apple.mpegurl')) {
            player.src = channelInfo.url;
            player.play();
        } else {
            alert('Your browser does not support playing this video stream.');
        }
    } else {
        player.src = channelInfo.url;
        player.load();
        player.play().catch(error => {
            console.error("Error playing stream:", error);
            alert('Unable to play the video stream. Please check your connection or try a different browser.');
        });
    }
}
